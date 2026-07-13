import { _id, _times } from './_mock';

export const _notifications = [
  {
    id: _id(1),
    title: 'Periode Baru Dibuat',
    description: 'Periode 2025/2026 Ganjil telah dibuat',
    avatarUrl: null,
    type: 'period-created',
    postedAt: _times(1),
    isUnRead: true,
  },
  {
    id: _id(2),
    title: 'Periode Ditutup',
    description: 'Periode 2024/2025 Genap telah dikunci',
    avatarUrl: null,
    type: 'period-locked',
    postedAt: _times(2),
    isUnRead: true,
  },
  {
    id: _id(3),
    title: 'Pengajuan Perubahan',
    description: 'Ada pengajuan perubahan data periode',
    avatarUrl: null,
    type: 'period-request',
    postedAt: _times(3),
    isUnRead: true,
  },
  {
    id: _id(4),
    title: 'Pengaturan Role',
    description: 'Role Staf Admisi telah ditambahkan',
    avatarUrl: null,
    type: 'role-update',
    postedAt: _times(4),
    isUnRead: false,
  },
  {
    id: _id(5),
    title: 'Sinkronisasi Data',
    description: 'Data prodi telah disinkronisasi',
    avatarUrl: null,
    type: 'sync-complete',
    postedAt: _times(5),
    isUnRead: false,
  },
];
