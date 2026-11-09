import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {
  MasterUser,
  LoginRequest,
  LoginResponse,
  AuditAction,
  AuditResult
} from '@machine-tracking/shared';
import { getSheetsRepository } from '../repositories/sheets-client';
import { AuditService } from './audit.service';

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET?.trim();
  if (!secret || secret.length < 32 || secret === 'esgi-garment-machine-tracking-secret-key-2026') {
    throw new Error('Konfigurasi JWT_SECRET belum aman. Isi .env dengan secret acak minimal 32 karakter.');
  }
  return secret;
}

export class AuthService {
  static async login(req: LoginRequest): Promise<LoginResponse> {
    const repo = getSheetsRepository();
    const cleanEmail = (req.email || '').trim();
    const user = await repo.getUserByEmail(cleanEmail);

    if (!user) {
      throw new Error('Email atau akun pengguna tidak ditemukan');
    }

    if (!user.Active) {
      throw new Error('Akun pengguna ini sedang dinonaktifkan. Silakan hubungi Administrator');
    }

    // Password input validation
    const inputPassword = typeof req.password === 'string' ? req.password : String(req.password ?? '');
    const trimmedInputPassword = inputPassword.trim();
    if (inputPassword.length === 0) {
      throw new Error('Password wajib diisi');
    }

    // Password stored in spreadsheet validation
    const rawStored = user.Password_Hash !== undefined && user.Password_Hash !== null ? String(user.Password_Hash) : '';
    const storedPassword = rawStored.trim();
    if (storedPassword.length === 0) {
      throw new Error('Akun belum memiliki password di spreadsheet (kolom password kosong). Silakan periksa spreadsheet Anda.');
    }

    // Support both bcrypt hash and plain-text passwords stored in Google Sheets.
    const isBcryptHash = /^\$2[aby]\$\d{2}\$/.test(storedPassword);
    let isValid = false;

    if (isBcryptHash) {
      isValid = await bcrypt.compare(inputPassword, storedPassword);
      if (!isValid && inputPassword !== trimmedInputPassword) {
        isValid = await bcrypt.compare(trimmedInputPassword, storedPassword);
      }
    } else {
      // Plain-text matching with flexibility for accidental spaces in spreadsheet cell or input
      isValid = (
        inputPassword === storedPassword ||
        trimmedInputPassword === storedPassword ||
        inputPassword === rawStored ||
        trimmedInputPassword === rawStored
      );
    }

    if (!isValid) {
      throw new Error('Password yang dimasukkan salah');
    }

    // Attempt migration to bcrypt hash, but do not block login if spreadsheet update fails
    if (!isBcryptHash) {
      try {
        const migratedHash = await bcrypt.hash(trimmedInputPassword || inputPassword, 10);
        const updatedUser = await repo.updateUser(user.User_ID, { Password_Hash: migratedHash });
        if (updatedUser) {
          user.Password_Hash = migratedHash;
        }
      } catch (migrErr: any) {
        console.warn(`[AuthService] Password terverifikasi, tetapi update hash ke spreadsheet gagal: ${migrErr?.message || migrErr}. Login tetap dilanjutkan.`);
      }
    }

    const { Password_Hash, ...safeUser } = user;

    // Generate JWT token (valid for 3 days)
    const token = jwt.sign(
      {
        userId: user.User_ID,
        email: user.Login_Email,
        role: user.Role_ID,
        name: user.User_Name
      },
      getJwtSecret(),
      { expiresIn: '3d' }
    );

    await AuditService.log({
      userId: user.User_ID,
      action: AuditAction.LOGIN,
      entityType: 'AUTH',
      entityId: user.User_ID,
      result: AuditResult.SUCCESS
    });

    return {
      token,
      user: safeUser
    };
  }

  static async getMe(userId: string): Promise<Omit<MasterUser, 'Password_Hash'>> {
    const repo = getSheetsRepository();
    const user = await repo.getUserById(userId);
    if (!user) {
      throw new Error('Pengguna tidak ditemukan');
    }
    const { Password_Hash, ...safeUser } = user;
    return safeUser;
  }
}
