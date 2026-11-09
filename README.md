# Machine Tracking System — PT ESGI Sambi

Sistem pelacakan mesin pabrik garment berbasis Web/PWA (React + TypeScript), Backend API (Node.js + Express + TypeScript), dan Google Sheets sebagai database utama.

---

## Fitur Utama

- **Identitas & Posisi Mesin**: Pelacakan posisi aktual (`Current_Location_ID`), PIC penanggung jawab (`Current_PIC_ID`), status operasional, dan kondisi fisik setiap mesin.
- **Pindai QR Code Langsung**: Menggunakan kamera HP / tablet pekerja di lantai produksi pabrik garment, dilengkapi fallback input token manual.
- **Cetak Label QR Resmi**: Format label stiker siap cetak dengan logo PT ESGI, ID Mesin, Nama Mesin, Serial Number, dan QR Code.
- **Protokol Transaksi Aman 7-Langkah**:
  1. Validasi hak akses role backend.
  2. Pengecekan idempotensi `Request_ID` (mencegah duplikasi).
  3. Kunci transaksi per mesin (mutex lock).
  4. Verifikasi pembacaan ulang master mesin.
  5. Pencatatan log transaksi awal `PENDING`.
  6. Pembaruan lokasi dan PIC aktif master mesin.
  7. Verifikasi penulisan, update log menjadi `COMPLETED`, dan pencatatan jejak audit.
- **Recovery Job**: Rekonsiliasi otomatis jika transaksi `PENDING` tertinggal akibat jaringan terputus.
- **Alur Pemeliharaan & Kerusakan**: Pelaporan kerusakan mesin dan antrean tindak lanjut perbaikan untuk mekanik.
- **Ekspor Data IE**: Ekspor data master mesin dan log perpindahan ke format CSV untuk analisis spreadsheet Industrial Engineering.
- **Dual-Engine Repository**: Berjalan instan dengan engine spreadsheet lokal, dan otomatis beralih ke live Google Sheets API saat kredensial Service Account dikonfigurasi.

---

## 8 Skema Sheet Database

1. `01_MASTER_MESIN`: Data master mesin fisik, token QR, lokasi & PIC aktif.
2. `02_MASTER_KATEGORI`: Master kategori mesin (Sewing, Cutting, Finishing, dll.).
3. `03_MASTER_LOKASI`: Master lokasi pabrik (Gedung, Lantai, Line, Area).
4. `04_MASTER_PIC`: Master penanggung jawab mesin dan operator leader.
5. `05_LOG_PERPINDAHAN`: Catatan transaksi perpindahan (append-only dengan status `PENDING` / `COMPLETED`).
6. `06_LOG_KONDISI`: Catatan kerusakan dan riwayat servis mekanik.
7. `07_MASTER_USER`: Akun pengguna aplikasi beserta role RBAC.
8. `08_LOG_AUDIT`: Log audit seluruh perubahan data penting.

---

## Cara Menjalankan Proyek

### 1. Prasyarat
- Node.js versi 18+ (disarankan Node.js 20 atau 24)
- npm versi 9+

### 2. Menjalankan Server Backend API
```bash
npm run dev:api
```
Server backend berjalan di `http://localhost:5000` (API prefix: `/api/v1`).

### 3. Menjalankan Frontend Web / PWA
```bash
npm run dev:web
```
Aplikasi web berjalan di `http://localhost:5173`.

### 4. Menjalankan Otomatisasi Tes Integrasi (T01 - T20)
```bash
npm run test:integration
```

---

## Akun Demo Pengujian

Aplikasi dilengkapi tombol **1-Click Login** di halaman masuk (`/login`):

| Role | Email | Password Default | Izin Utama |
|---|---|---|---|
| **Administrator** | `admin@esgi.co.id` | `password123` | Akses penuh ke seluruh fitur & master |
| **Industrial Engineering (IE)** | `ie.supervisor@esgi.co.id` | `password123` | Registrasi mesin, analitik, ekspor CSV |
| **Supervisor Sewing (SPV)** | `spv.sewing@esgi.co.id` | `password123` | Perpindahan mesin, pelaporan kerusakan |
| **Mekanik / Maintenance** | `mekanik@esgi.co.id` | `password123` | Update perbaikan mesin, status servis |
| **PIC / Operator** | `pic.operator@esgi.co.id` | `password123` | Pindai QR, lihat profil mesin |

---

## Menghubungkan ke Google Sheets API Resmi

Untuk menghubungkan sistem ke Google Spreadsheet asli:
1. Buat Service Account di Google Cloud Console dan unduh file JSON key.
2. Buat Google Spreadsheet baru dan bagikan akses **Editor** ke email service account Anda.
3. Buka file `apps/api/.env` dan isi variabel berikut:
   ```env
   STORAGE_MODE=google
   GOOGLE_SHEETS_SPREADSHEET_ID=id_spreadsheet_anda
   GOOGLE_SERVICE_ACCOUNT_EMAIL=service-account@project.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   ```
4. Restart backend (`npm run dev:api`). Backend otomatis membaca dan menulis langsung ke Google Spreadsheet!


---

## Optimasi UI — Loading & Notifikasi

- Menambahkan animasi loading untuk pemeriksaan sesi, dashboard, daftar/detail mesin, data master, riwayat, audit, serta formulir perpindahan.
- Menambahkan notifikasi toast di dalam aplikasi untuk keberhasilan pemuatan data, login, penyimpanan, perpindahan mesin, pelaporan kondisi, dan ekspor.
- Mengganti pemanggilan `alert()` pada halaman terkait dengan notifikasi internal aplikasi.
- Menambahkan status proses pada tombol login dan transaksi, serta menonaktifkan tombol perpindahan ketika data form masih dimuat.
- Notifikasi tidak menggunakan notifikasi browser; tampil di dalam halaman aplikasi dan menutup otomatis.

### Setelah mengekstrak ZIP

Jalankan dari folder proyek:

```bash
npm install
npm run build
```

Untuk pengembangan lokal, jalankan backend dan frontend pada dua terminal:

```bash
npm run dev:api
```

```bash
npm run dev:web
```

Catatan: folder `node_modules` tidak disertakan agar paket tetap ringan dan dependensi dapat dipasang sesuai sistem pengguna. Build frontend lama tidak disertakan; `npm run build` akan membuat ulang hasil build dari source terbaru.
