import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import {
  MachineStatus,
  MachineCondition,
  UserRole,
  MovementStatus,
  ConditionType,
  RepairStatus,
  AuditResult
} from '@machine-tracking/shared';

export async function seedInitialData() {
  console.log('🌱 Menyiapkan data awal Master Pabrik Garment PT ESGI...');

  const dataDir = path.resolve(__dirname, '../../data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const defaultPasswordHash = await bcrypt.hash('password123', 10);
  const now = new Date().toISOString();

  const database = {
    '01_MASTER_MESIN': [
      {
        Machine_ID: 'MC-000001',
        QR_Token: 'QR-MC892301A',
        Machine_Name: 'Mesin Jahit 1-Needle High Speed',
        Category_ID: 'CAT-001',
        Brand: 'JUKI',
        Model: 'DDL-8700-7',
        Serial_Number: 'JK-8923011',
        Asset_Number: 'AST-ESGI-2024-001',
        ID_Code: '',
        Purchase_Date: '2024-01-15',
        Current_Location_ID: 'LOC-0001',
        Current_PIC_ID: 'PIC-0003',
        Current_Status: MachineStatus.IN_USE,
        Machine_Condition: MachineCondition.NORMAL,
        Created_At: now,
        Created_By: 'USR-001',
        Updated_At: now,
        Updated_By: 'USR-001',
        Active: true,
        Notes: 'Beroperasi normal di sewing line 01'
      },
      {
        Machine_ID: 'MC-000002',
        QR_Token: 'QR-MC892302B',
        Machine_Name: 'Mesin Obras 4 Benang',
        Category_ID: 'CAT-001',
        Brand: 'YAMATO',
        Model: 'AZ8000G',
        Serial_Number: 'YM-442190',
        Asset_Number: 'AST-ESGI-2024-002',
        ID_Code: '',
        Purchase_Date: '2024-02-10',
        Current_Location_ID: 'LOC-0001',
        Current_PIC_ID: 'PIC-0003',
        Current_Status: MachineStatus.IN_USE,
        Machine_Condition: MachineCondition.NORMAL,
        Created_At: now,
        Created_By: 'USR-001',
        Updated_At: now,
        Updated_By: 'USR-001',
        Active: true,
        Notes: 'Jahit tepi kain kemeja'
      },
      {
        Machine_ID: 'MC-000003',
        QR_Token: 'QR-MC892303C',
        Machine_Name: 'Mesin Lubang Kancing Elektronik',
        Category_ID: 'CAT-001',
        Brand: 'BROTHER',
        Model: 'HE-800B',
        Serial_Number: 'BR-982103',
        Asset_Number: 'AST-ESGI-2024-003',
        ID_Code: '',
        Purchase_Date: '2024-03-01',
        Current_Location_ID: 'LOC-0002',
        Current_PIC_ID: 'PIC-0004',
        Current_Status: MachineStatus.IN_USE,
        Machine_Condition: MachineCondition.NORMAL,
        Created_At: now,
        Created_By: 'USR-001',
        Updated_At: now,
        Updated_By: 'USR-001',
        Active: true,
        Notes: 'Pembuatan lubang kancing otomatis'
      },
      {
        Machine_ID: 'MC-000004',
        QR_Token: 'QR-MC892304D',
        Machine_Name: 'Straight Knife Cutting Machine 8 Inch',
        Category_ID: 'CAT-002',
        Brand: 'EASTMAN',
        Model: 'Blue Streak II 629X',
        Serial_Number: 'EM-120934',
        Asset_Number: 'AST-ESGI-2023-018',
        ID_Code: '',
        Purchase_Date: '2023-08-20',
        Current_Location_ID: 'LOC-0006',
        Current_PIC_ID: 'PIC-0005',
        Current_Status: MachineStatus.AVAILABLE,
        Machine_Condition: MachineCondition.NORMAL,
        Created_At: now,
        Created_By: 'USR-001',
        Updated_At: now,
        Updated_By: 'USR-001',
        Active: true,
        Notes: 'Pisau potong pola tumpukan kain'
      },
      {
        Machine_ID: 'MC-000005',
        QR_Token: 'QR-MC892305E',
        Machine_Name: 'Continuous Fusing Press Machine',
        Category_ID: 'CAT-006',
        Brand: 'HASHIMA',
        Model: 'HP-450MS',
        Serial_Number: 'HS-773412',
        Asset_Number: 'AST-ESGI-2023-025',
        ID_Code: '',
        Purchase_Date: '2023-11-05',
        Current_Location_ID: 'LOC-0007',
        Current_PIC_ID: 'PIC-0001',
        Current_Status: MachineStatus.IN_USE,
        Machine_Condition: MachineCondition.NORMAL,
        Created_At: now,
        Created_By: 'USR-001',
        Updated_At: now,
        Updated_By: 'USR-001',
        Active: true,
        Notes: 'Press interlining kerah dan manset'
      },
      {
        Machine_ID: 'MC-000006',
        QR_Token: 'QR-MC892306F',
        Machine_Name: 'Mesin Jahit 2-Needle Kansai',
        Category_ID: 'CAT-001',
        Brand: 'KANSAI SPECIAL',
        Model: 'DLR-1508P',
        Serial_Number: 'KS-331298',
        Asset_Number: 'AST-ESGI-2023-040',
        ID_Code: '',
        Purchase_Date: '2023-12-10',
        Current_Location_ID: 'LOC-0008',
        Current_PIC_ID: 'PIC-0005',
        Current_Status: MachineStatus.IDLE,
        Machine_Condition: MachineCondition.NORMAL,
        Created_At: now,
        Created_By: 'USR-001',
        Updated_At: now,
        Updated_By: 'USR-001',
        Active: true,
        Notes: 'Mesin cadangan di gudang peralatan'
      },
      {
        Machine_ID: 'MC-000007',
        QR_Token: 'QR-MC892307G',
        Machine_Name: 'Mesin Jahit Jarum 1 Direct Drive',
        Category_ID: 'CAT-001',
        Brand: 'BROTHER',
        Model: 'S-7200C',
        Serial_Number: 'BR-554210',
        Asset_Number: 'AST-ESGI-2022-088',
        ID_Code: '',
        Purchase_Date: '2022-06-15',
        Current_Location_ID: 'LOC-0009',
        Current_PIC_ID: 'PIC-0002',
        Current_Status: MachineStatus.UNDER_REPAIR,
        Machine_Condition: MachineCondition.DAMAGED,
        Created_At: now,
        Created_By: 'USR-001',
        Updated_At: now,
        Updated_By: 'USR-001',
        Active: true,
        Notes: 'Sedang diservis di bengkel mekanik'
      }
    ],

    '02_MASTER_KATEGORI': [
      {
        Category_ID: 'CAT-001',
        Category_Name: 'Sewing',
        Department: 'Sewing',
        Description: 'Mesin jahit Single Needle, Obras, Overdeck, Bartek, Lubang Kancing',
        Active: true
      },
      {
        Category_ID: 'CAT-002',
        Category_Name: 'Cutting',
        Department: 'Cutting',
        Description: 'Mesin potong kain tegak, pisau bundar, band knife',
        Active: true
      },
      {
        Category_ID: 'CAT-003',
        Category_Name: 'Spreading',
        Department: 'Cutting',
        Description: 'Mesin gelar kain otomatis & manual',
        Active: true
      },
      {
        Category_ID: 'CAT-004',
        Category_Name: 'Bundling',
        Department: 'Preparation',
        Description: 'Peralatan pengikatan bundle komponen potong',
        Active: true
      },
      {
        Category_ID: 'CAT-005',
        Category_Name: 'Numbering',
        Department: 'Preparation',
        Description: 'Mesin stempel penomoran potong (numbering sticker)',
        Active: true
      },
      {
        Category_ID: 'CAT-006',
        Category_Name: 'Pressing',
        Department: 'Finishing',
        Description: 'Mesin press interlining, fusing, setrika uap',
        Active: true
      },
      {
        Category_ID: 'CAT-007',
        Category_Name: 'Finishing',
        Department: 'Finishing',
        Description: 'Mesin pasang kancing, buang benang, steam tunnel',
        Active: true
      },
      {
        Category_ID: 'CAT-008',
        Category_Name: 'Maintenance Equipment',
        Department: 'Maintenance',
        Description: 'Peralatan teknisi, kompresor angin, gerinda, bor duduk',
        Active: true
      }
    ],

    '03_MASTER_LOKASI': [
      {
        Location_ID: 'LOC-0001',
        Building: 'Gedung Produksi A',
        Floor: 'Lantai 1',
        Department: 'Sewing',
        Area: 'Produksi Utama',
        Line: 'Line 01',
        Position_Code: 'L01-POS-01',
        Location_Name: 'Gedung A - Sewing Line 01',
        Active: true,
        Notes: 'Kemeja Pria Ekspor'
      },
      {
        Location_ID: 'LOC-0002',
        Building: 'Gedung Produksi A',
        Floor: 'Lantai 1',
        Department: 'Sewing',
        Area: 'Produksi Utama',
        Line: 'Line 02',
        Position_Code: 'L02-POS-01',
        Location_Name: 'Gedung A - Sewing Line 02',
        Active: true,
        Notes: 'Celana Formal'
      },
      {
        Location_ID: 'LOC-0003',
        Building: 'Gedung Produksi A',
        Floor: 'Lantai 1',
        Department: 'Sewing',
        Area: 'Produksi Utama',
        Line: 'Line 03',
        Position_Code: 'L03-POS-01',
        Location_Name: 'Gedung A - Sewing Line 03',
        Active: true,
        Notes: 'Jacket & Outerwear'
      },
      {
        Location_ID: 'LOC-0004',
        Building: 'Gedung Produksi A',
        Floor: 'Lantai 2',
        Department: 'Sewing',
        Area: 'Produksi Utama',
        Line: 'Line 04',
        Position_Code: 'L04-POS-01',
        Location_Name: 'Gedung A - Sewing Line 04',
        Active: true,
        Notes: 'Kaos Polo & T-Shirt'
      },
      {
        Location_ID: 'LOC-0005',
        Building: 'Gedung Produksi A',
        Floor: 'Lantai 2',
        Department: 'Sewing',
        Area: 'Produksi Utama',
        Line: 'Line 05',
        Position_Code: 'L05-POS-01',
        Location_Name: 'Gedung A - Sewing Line 05',
        Active: true,
        Notes: 'Seragam Kerja'
      },
      {
        Location_ID: 'LOC-0006',
        Building: 'Gedung Produksi B',
        Floor: 'Lantai 1',
        Department: 'Cutting',
        Area: 'Cutting Room',
        Line: 'Cutting Table 1',
        Position_Code: 'CUT-TB-01',
        Location_Name: 'Gedung B - Ruang Cutting',
        Active: true,
        Notes: 'Meja gelar dan potong'
      },
      {
        Location_ID: 'LOC-0007',
        Building: 'Gedung Produksi A',
        Floor: 'Lantai 1',
        Department: 'Finishing',
        Area: 'Press & Ironing',
        Line: 'Finishing Line 01',
        Position_Code: 'FIN-01',
        Location_Name: 'Gedung A - Ruang Finishing',
        Active: true,
        Notes: 'Setrika uap dan packaging'
      },
      {
        Location_ID: 'LOC-0008',
        Building: 'Gedung Logistik',
        Floor: 'Lantai 1',
        Department: 'Gudang',
        Area: 'Gudang Mesin & Sparepart',
        Line: 'Rack Mesin Standby',
        Position_Code: 'GDG-MSN-A',
        Location_Name: 'Gudang Mesin Cadangan (Standby)',
        Active: true,
        Notes: 'Mesin siap pakai cadangan'
      },
      {
        Location_ID: 'LOC-0009',
        Building: 'Workshop Teknik',
        Floor: 'Lantai 1',
        Department: 'Maintenance',
        Area: 'Bengkel Servis',
        Line: 'Meja Servis Mekanik',
        Position_Code: 'WRK-01',
        Location_Name: 'Workshop Maintenance',
        Active: true,
        Notes: 'Area perbaikan dan overhaul mesin'
      },
      {
        Location_ID: 'LOC-0010',
        Building: 'Gedung Logistik',
        Floor: 'Lantai 1',
        Department: 'QA',
        Area: 'Karantina',
        Line: 'Zona Isolasi',
        Position_Code: 'QRT-01',
        Location_Name: 'Area Karantina Mesin Bermasalah',
        Active: true,
        Notes: 'Mesin menunggu keputusan afkir/servis besar'
      }
    ],

    '04_MASTER_PIC': [
      {
        PIC_ID: 'PIC-0001',
        PIC_Name: 'Ahmad Fauzi',
        Employee_ID: 'EMP-1044',
        Department: 'Sewing',
        Role: 'Supervisor Sewing Line',
        User_ID: 'USR-003',
        Active: true
      },
      {
        PIC_ID: 'PIC-0002',
        PIC_Name: 'Budi Santoso',
        Employee_ID: 'EMP-1088',
        Department: 'Maintenance',
        Role: 'Head Mechanic',
        User_ID: 'USR-004',
        Active: true
      },
      {
        PIC_ID: 'PIC-0003',
        PIC_Name: 'Citra Dewi',
        Employee_ID: 'EMP-2101',
        Department: 'Sewing',
        Role: 'Leader Operator Line 01',
        User_ID: 'USR-005',
        Active: true
      },
      {
        PIC_ID: 'PIC-0004',
        PIC_Name: 'Dodi Prasetyo',
        Employee_ID: 'EMP-2105',
        Department: 'Sewing',
        Role: 'Leader Operator Line 02',
        User_ID: '',
        Active: true
      },
      {
        PIC_ID: 'PIC-0005',
        PIC_Name: 'Eko Wibowo',
        Employee_ID: 'EMP-1190',
        Department: 'Gudang',
        Role: 'PIC Gudang Mesin',
        User_ID: '',
        Active: true
      }
    ],

    '05_LOG_PERPINDAHAN': [
      {
        Movement_ID: 'MOV-000001',
        Machine_ID: 'MC-000001',
        From_Location_ID: 'LOC-0008',
        To_Location_ID: 'LOC-0001',
        Old_PIC_ID: 'PIC-0005',
        New_PIC_ID: 'PIC-0003',
        Movement_DateTime: '2026-03-01T08:30:00.000Z',
        Movement_Reason: 'Setup awal sewing line 01 untuk PO Kemeja',
        Requested_By: 'USR-002',
        Approved_By: '',
        Status: MovementStatus.COMPLETED,
        Notes: 'Mesin dipindahkan dan dikalibrasi',
        Request_ID: 'init-mov-001'
      },
      {
        Movement_ID: 'MOV-000002',
        Machine_ID: 'MC-000007',
        From_Location_ID: 'LOC-0002',
        To_Location_ID: 'LOC-0009',
        Old_PIC_ID: 'PIC-0004',
        New_PIC_ID: 'PIC-0002',
        Movement_DateTime: '2026-03-10T14:15:00.000Z',
        Movement_Reason: 'Mogok servo motor saat jahit celana',
        Requested_By: 'USR-003',
        Approved_By: '',
        Status: MovementStatus.COMPLETED,
        Notes: 'Dipindahkan ke workshop maintenance',
        Request_ID: 'init-mov-002'
      }
    ],

    '06_LOG_KONDISI': [
      {
        Condition_Log_ID: 'CND-000001',
        Machine_ID: 'MC-000007',
        Report_DateTime: '2026-03-10T14:00:00.000Z',
        Condition_Type: ConditionType.DAMAGED,
        Problem_Description: 'Error E-07 pada control box, motor tidak berputar',
        Reported_By: 'USR-003',
        Technician_ID: 'PIC-0002',
        Action_Taken: 'Pemeriksaan modul daya inverter & pergantian sensor encoder',
        Repair_Status: RepairStatus.IN_PROGRESS,
        Completion_DateTime: '',
        Notes: 'Menunggu sparepart IC controller dari supplier'
      }
    ],

    '07_MASTER_USER': [
      {
        User_ID: 'USR-001',
        User_Name: 'Admin Sistem Pabrik',
        Login_Email: 'admin@esgi.co.id',
        Password_Hash: defaultPasswordHash,
        Role_ID: UserRole.ADMIN,
        Department: 'IT & Sistem',
        Active: true,
        Created_At: now
      },
      {
        User_ID: 'USR-002',
        User_Name: 'Rian Pradana (IE Supervisor)',
        Login_Email: 'ie.supervisor@esgi.co.id',
        Password_Hash: defaultPasswordHash,
        Role_ID: UserRole.IE,
        Department: 'Industrial Engineering',
        Active: true,
        Created_At: now
      },
      {
        User_ID: 'USR-003',
        User_Name: 'Ahmad Fauzi (SPV Sewing)',
        Login_Email: 'spv.sewing@esgi.co.id',
        Password_Hash: defaultPasswordHash,
        Role_ID: UserRole.SPV,
        Department: 'Sewing',
        Active: true,
        Created_At: now
      },
      {
        User_ID: 'USR-004',
        User_Name: 'Budi Santoso (Mekanik)',
        Login_Email: 'mekanik@esgi.co.id',
        Password_Hash: defaultPasswordHash,
        Role_ID: UserRole.MECHANIC,
        Department: 'Maintenance',
        Active: true,
        Created_At: now
      },
      {
        User_ID: 'USR-005',
        User_Name: 'Citra Dewi (PIC Line)',
        Login_Email: 'pic.operator@esgi.co.id',
        Password_Hash: defaultPasswordHash,
        Role_ID: UserRole.PIC,
        Department: 'Sewing',
        Active: true,
        Created_At: now
      }
    ],

    '08_LOG_AUDIT': [
      {
        Audit_ID: 'AUD-000001',
        User_ID: 'USR-001',
        Action: 'SETUP_INITIAL',
        Entity_Type: 'SYSTEM',
        Entity_ID: 'DATABASE_INIT',
        Timestamp: now,
        Old_Value: '',
        New_Value: 'Initial setup 8 sheets with garment factory template',
        Request_ID: 'init-audit-001',
        Result: AuditResult.SUCCESS
      }
    ]
  };

  const jsonPath = path.join(dataDir, 'sheets.json');
  fs.writeFileSync(jsonPath, JSON.stringify(database, null, 2), 'utf-8');
  console.log(`✅ File sheets lokal berhasil dibuat di: ${jsonPath}`);
  console.log('✅ 8 Sheet siap digunakan: 01_MASTER_MESIN s/d 08_LOG_AUDIT');
}

// Run if called directly
if (require.main === module) {
  seedInitialData().catch(console.error);
}
