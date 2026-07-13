export type AcademicRole = 'Admin Akademik' | 'Staf Admisi' | 'Dosen';

export interface AcademicPeriod {
  id: string;
  kode_periode: string;
  tahun_ajaran: string;
  semester: string;
  nama_periode: string;
  nama_singkat: string;
  tanggal_awal_kuliah: string;
  tanggal_akhir_kuliah: string;
  tanggal_awal_uts: string;
  tanggal_akhir_uts: string;
  tanggal_awal_uas: string;
  tanggal_akhir_uas: string;
  total_prodi_terisi: number;
  status_aktif: boolean;
  is_locked: boolean;
}

export interface AcademicPeriodFormData {
  kode_periode: string;
  tahun_ajaran: string;
  semester: string;
  nama_periode: string;
  nama_singkat: string;
  tanggal_awal_kuliah: string;
  tanggal_akhir_kuliah: string;
  tanggal_awal_uts: string;
  tanggal_akhir_uts: string;
  tanggal_awal_uas: string;
  tanggal_akhir_uas: string;
  total_prodi_terisi: number;
  status_aktif: boolean;
  is_locked: boolean;
}

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

export interface ReportSummary {
  totalPeriods: number;
  activePeriods: number;
  inactivePeriods: number;
  lockedPeriods: number;
}
