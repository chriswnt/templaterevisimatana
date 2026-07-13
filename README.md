# Sistem Manajemen Periode Akademik

> Aplikasi web administrasi untuk mengelola periode akademik di Universitas Matana. Dibangun dengan React, Material-UI, dan TypeScript.

## Fitur

### 🔐 Autentikasi & Role
- Login berbasis role yang disimpan di local storage
- Tiga role pengguna: **Admin Akademik**, **Staf Admisi**, **Dosen**
- Route guard otomatis mengarahkan pengguna yang belum login ke halaman sign-in
- Setiap role memiliki hak akses yang berbeda

### 📊 Dashboard
- Ringkasan metrik: Total Periode, Periode Aktif, Periode Tidak Aktif, Periode Terkunci
- Panel aksi cepat: Buat Periode Baru, Lihat Laporan, Pengaturan
- Tabel periode terbaru (5 periode terakhir)

### 📅 Manajemen Periode Akademik (CRUD)
- Tabel data interaktif dengan fitur:
  - Pencarian berdasarkan kode, nama, atau tahun ajaran
  - Filter berdasarkan Tahun Ajaran, Status (Aktif/Tidak Aktif/Terkunci), Semester (Ganjil/Genap/Pendek)
  - Sorting pada setiap kolom
  - Paginasi (5, 10, atau 25 baris)
  - Seleksi baris untuk hapus massal (admin)
- Form create/edit dengan validasi:
  - Kode Periode, Nama Singkat, Nama Periode
  - Tahun Ajaran, Semester
  - Tanggal Awal/Akhir Kuliah, UTS, UAS (date picker)
  - Status Aktif (toggle)
- Hapus dengan konfirmasi dialog (single dan bulk)
- Periode terkunci tidak dapat diedit (ditampilkan dengan banner peringatan)

### 📈 Pelaporan & Ekspor
- Kartu ringkasan metrik
- Grafik batang bertumpuk (ApexCharts): periode per tahun ajaran, dikelompokkan per semester
- Preset filter: Semua / Hanya Aktif / Memiliki UTS & UAS
- Filter tambahan: Status, Tahun Ajaran
- Ekspor CSV (Admin Akademik & Dosen)
- Cetak PDF (Admin Akademik & Dosen)

### ⚙️ Pengaturan
- Toggle tema: Terang / Gelap / Sistem
- Pengganti role pengguna
- Informasi aplikasi (nama, versi, branding)

### 🎨 Tampilan
- UI berbahasa Indonesia
- Branding Universitas Matana (logo, warna, font)
- Tema kustom dengan palet warna biru/navy
- Responsif — sidebar desktop & drawer mobile
- Halaman 404 dengan ilustrasi

## Tech Stack

| Teknologi | Versi | Kegunaan |
|---|---|---|
| React | 19.1.0 | Library UI |
| TypeScript | 5.8.2 | Type safety |
| Vite | 6.2.5 | Build tool |
| MUI (Material-UI) | 7.0.1 | Komponen UI |
| React Router | 7.4.1 | Routing |
| Axios | 1.18.1 | HTTP client |
| ApexCharts | 4.5.0 | Grafik |
| dayjs | 1.11.13 | Manipulasi tanggal (locale: id) |
| Iconify | 5.2.1 | Ikon (Solar iconset) |

## Persyaratan Sistem

- **Node.js** >= 20.x
- **Yarn** 1.22.x (classic) — atau npm sebagai alternatif

## Tutorial Pemasangan

### 1. Clone Repository

```bash
git clone https://github.com/chriswnt/templaterevisimatana.git
cd material-kit-react
```

### 2. Install Dependensi

Menggunakan Yarn (direkomendasikan):

```bash
yarn install
```

Atau menggunakan npm:

```bash
npm install
```

### 3. Konfigurasi Environment

Buat file `.env` di root project:

```env
VITE_API_URL=http://127.0.0.1:8000/api/
```

> **Catatan:** File `.env` sudah otomatis diabaikan oleh git. Jika backend berjalan di URL berbeda, sesuaikan nilai `VITE_API_URL`.

### 4. Jalankan Aplikasi (Development)

```bash
yarn dev
```

Atau:

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3039`.

### 5. Build untuk Production

```bash
yarn build
```

Atau:

```bash
npm run build
```

Hasil build akan tersimpan di folder `dist/`.

### 6. Deploy ke Vercel (Opsional)

Project sudah dikonfigurasi untuk deployment ke Vercel. Cukup hubungkan repository ke Vercel dan build settings akan terdeteksi secara otomatis.

## Struktur Direktori

```
material-kit-react/
├── public/                    # Aset statis (logo, gambar)
├── src/
│   ├── components/            # Komponen UI reusable
│   ├── layouts/               # Layout dashboard & navigasi
│   ├── lib/                   # Tipe data & definisi domain
│   ├── pages/                 # Halaman (lazy-loaded)
│   ├── routes/                # Konfigurasi routing & guards
│   ├── sections/              # Modul fitur (auth, overview, academic-period, reporting, settings)
│   ├── services/api/          # HTTP client & service layer
│   ├── theme/                 # Konfigurasi tema MUI
│   └── utils/                 # Utility functions (format tanggal, angka)
├── index.html
├── package.json
├── vite.config.ts
└── vercel.json
```



