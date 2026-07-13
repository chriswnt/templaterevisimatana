import type { Column } from 'src/components/data-table/types';
import type { SortConfig, AcademicPeriod, AcademicPeriodFormData } from 'src/lib/types';

import { useMemo, useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import DialogTitle from '@mui/material/DialogTitle';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';

import { fDate } from 'src/utils/format-time';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { DataTable } from 'src/components/data-table';
import { useAuthContext } from 'src/components/providers';
import { StatusBadge } from 'src/components/status-badge';
import { PageHeroBanner } from 'src/components/page-hero-banner';
import { NotificationBanner } from 'src/components/notification-banner';

import { useAcademicPeriods } from '../hooks';
import { AcademicPeriodForm } from '../components/academic-period-form';
import { AcademicPeriodToolbar } from '../components/academic-period-toolbar';

import type { FilterState } from '../types';

export function AcademicPeriodView() {
  const { currentRole } = useAuthContext();
  const { data, isLoading, error, create, update, remove, fetchAll } = useAcademicPeriods();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'kode_periode', direction: 'asc' });
  const [filters, setFilters] = useState<FilterState>({ search: '', status: '', semester: '', tahun_ajaran: '' });
  const [mode, setMode] = useState<'table' | 'form'>('table');
  const [editingItem, setEditingItem] = useState<AcademicPeriod | null>(null);
  const [detailMode, setDetailMode] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<AcademicPeriod | null>(null);
  const [deleteManyIds, setDeleteManyIds] = useState<string[]>([]);
  const [deleting, setDeleting] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<{ el: HTMLElement; item: AcademicPeriod } | null>(null);

  const isAdmin = currentRole === 'Admin Akademik';

  const handleDeleteSingle = useCallback(async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await remove(deleteTarget.id);
      setSelected((prev) => prev.filter((id) => id !== deleteTarget.id));
    } catch { /* handled in hook */ }
    setDeleting(false);
    setDeleteTarget(null);
  }, [deleteTarget, remove]);

  const handleDeleteMany = useCallback(async () => {
    if (deleteManyIds.length === 0) return;
    setDeleting(true);
    try {
      for (const id of deleteManyIds) {
        await remove(id);
      }
      setSelected([]);
    } catch { /* handled in hook */ }
    setDeleting(false);
    setDeleteManyIds([]);
  }, [deleteManyIds, remove]);

  const availableYears = useMemo(() => {
    const years = [...new Set(data.map((d) => d.tahun_ajaran))];
    return years.sort();
  }, [data]);

  const handleFilterChange = useCallback((key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(0);
  }, []);

  const handleSortChange = useCallback((key: string) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  }, []);

  const handleCreateClick = useCallback(() => {
    setEditingItem(null);
    setDetailMode(false);
    setMode('form');
  }, []);

  const handleEditClick = useCallback((item: AcademicPeriod) => {
    setEditingItem(item);
    setDetailMode(false);
    setMode('form');
  }, []);

  const handleDetailClick = useCallback((item: AcademicPeriod) => {
    setEditingItem(item);
    setDetailMode(true);
    setMode('form');
  }, []);

  const handleCodeClick = useCallback(
    (item: AcademicPeriod) => {
      if (isAdmin) {
        setMenuAnchor({ el: document.activeElement as HTMLElement, item });
      } else {
        handleDetailClick(item);
      }
    },
    [isAdmin, handleDetailClick]
  );

  const handleFormSubmit = useCallback(
    async (formData: AcademicPeriodFormData) => {
      try {
        if (editingItem) {
          await update(editingItem.id, formData);
        } else {
          await create(formData);
        }
        setMode('table');
        setEditingItem(null);
        setDetailMode(false);
      } catch {
        /* error handled in hook */
      }
    },
    [editingItem, create, update]
  );

  const dataFiltered = useMemo(() => {
    let result = [...data];

    if (sortConfig.key) {
      result.sort((a, b) => {
        const aVal = String(a[sortConfig.key as keyof AcademicPeriod] ?? '');
        const bVal = String(b[sortConfig.key as keyof AcademicPeriod] ?? '');
        const cmp = aVal.localeCompare(bVal);
        return sortConfig.direction === 'asc' ? cmp : -cmp;
      });
    }

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (item) =>
          item.nama_periode.toLowerCase().includes(q) ||
          item.kode_periode.toLowerCase().includes(q) ||
          item.tahun_ajaran.includes(q)
      );
    }

    if (filters.status === 'active') result = result.filter((item) => item.status_aktif);
    if (filters.status === 'inactive') result = result.filter((item) => !item.status_aktif && !item.is_locked);
    if (filters.status === 'locked') result = result.filter((item) => item.is_locked);

    if (filters.semester) {
      result = result.filter((item) => item.semester === filters.semester);
    }

    if (filters.tahun_ajaran) {
      result = result.filter((item) => item.tahun_ajaran === filters.tahun_ajaran);
    }

    return result;
  }, [data, sortConfig, filters]);

  const paginatedData = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const columns: Column<AcademicPeriod>[] = useMemo(
    () => [
      {
        id: 'kode_periode',
        label: 'Kode',
        width: 140,
        sortable: true,
        renderCell: isAdmin
          ? (row: AcademicPeriod) => (
              <Box
                component="span"
                onClick={(e: React.MouseEvent) => {
                  setMenuAnchor({ el: e.currentTarget as HTMLElement, item: row });
                }}
                sx={{
                  cursor: 'pointer',
                  fontWeight: 600,
                  color: '#2563EB',
                  transition: 'color 0.15s ease',
                  '&:hover': { color: '#1D4ED8', textDecoration: 'underline' },
                }}
              >
                {row.kode_periode}
              </Box>
            )
          : undefined,
      },
      { id: 'nama_periode', label: 'Nama Periode', sortable: true },
      { id: 'tahun_ajaran', label: 'Tahun Ajaran', width: 130, sortable: true },
      { id: 'semester', label: 'Semester', width: 110, sortable: true },
      {
        id: 'status_aktif',
        label: 'Status',
        width: 130,
        sortable: true,
        renderCell: (row) => {
          const status = row.is_locked ? 'locked' : row.status_aktif ? 'active' : 'inactive';
          return <StatusBadge status={status} size="sm" />;
        },
      },
      {
        id: 'tanggal',
        label: 'Tanggal Kuliah',
        renderCell: (row) => `${fDate(row.tanggal_awal_kuliah)} - ${fDate(row.tanggal_akhir_kuliah)}`,
      },
    ],
    [isAdmin]
  );

  if (mode === 'form') {
    return (
      <DashboardContent>
        <PageHeroBanner
          title={detailMode ? 'Detail Periode Akademik' : editingItem ? 'Edit Periode Akademik' : 'Tambah Periode Akademik'}
          description={
            detailMode
              ? 'Lihat informasi lengkap periode akademik.'
              : editingItem
                ? 'Ubah data periode akademik yang sudah ada.'
                : 'Buat periode akademik baru untuk tahun ajaran dan semester tertentu.'
          }
          badge="Sistem Admin Akademik"
          image="/assetsmatana/professional-team-man-woman-business.jpg"
        />

        <AcademicPeriodForm
          initialData={editingItem}
          onSubmit={handleFormSubmit}
          onCancel={() => { setMode('table'); setEditingItem(null); setDetailMode(false); }}
          isLoading={isLoading}
          isLocked={editingItem?.is_locked ?? false}
          readOnly={detailMode}
        />
      </DashboardContent>
    );
  }

  return (
    <DashboardContent>
      <PageHeroBanner
        title="Data Periode Akademik"
        description="Kelola data periode akademik, jadwal kuliah, dan status perkuliahan Universitas Matana."
        badge="Sistem Admin Akademik"
        infoBadge={`${data.length} total periode akademik`}
        image="/assetsmatana/professional-team-man-woman-business.jpg"
      />

      {error && (
        <NotificationBanner
          type="error"
          message={error}
          onClose={() => fetchAll()}
          sx={{ mb: 2 }}
        />
      )}

      <DataTable
        columns={columns}
        data={paginatedData}
        total={dataFiltered.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={setPage}
        onRowsPerPageChange={(rpp) => { setRowsPerPage(rpp); setPage(0); }}
        sortConfig={sortConfig}
        onSortChange={handleSortChange}
        primaryKey={isAdmin ? undefined : 'kode_periode'}
        onPrimaryClick={isAdmin ? undefined : handleCodeClick}
        getRowId={(row) => row.id}
        loading={isLoading}
        emptyTitle="Tidak ada data"
        emptyDescription={filters.search ? 'Coba ubah kata kunci pencarian' : 'Belum ada periode akademik.'}
        selected={isAdmin ? selected : undefined}
        onSelectAllRows={isAdmin ? setSelected : undefined}
        onSelectRow={isAdmin ? (id) => {
          setSelected((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
          );
        } : undefined}
        toolbar={
          <AcademicPeriodToolbar
            filters={filters}
            onFilterChange={handleFilterChange}
            role={currentRole}
            onCreateClick={handleCreateClick}
            availableYears={availableYears}
          />
        }
      />

      {/* Menu aksi untuk admin */}
      {menuAnchor && (
        <Menu
          open
          anchorEl={menuAnchor.el}
          onClose={() => setMenuAnchor(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          <MenuItem onClick={() => { handleEditClick(menuAnchor.item); setMenuAnchor(null); }}>
            <ListItemIcon><Iconify icon="solar:pen-bold-duotone" width={18} /></ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => { setDeleteTarget(menuAnchor.item); setMenuAnchor(null); }}>
            <ListItemIcon><Iconify icon="solar:trash-bin-trash-bold-duotone" width={18} sx={{ color: 'error.main' }} /></ListItemIcon>
            <ListItemText sx={{ color: 'error.main' }}>Hapus</ListItemText>
          </MenuItem>
        </Menu>
      )}

      {isAdmin && selected.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button
            variant="outlined"
            color="error"
            startIcon={<Iconify icon="solar:trash-bin-trash-bold-duotone" width={18} />}
            onClick={() => setDeleteManyIds(selected)}
            sx={{ borderRadius: 1.5, textTransform: 'none', fontWeight: 500 }}
          >
            Hapus {selected.length} terpilih
          </Button>
        </Box>
      )}

      {/* Konfirmasi hapus satu */}
      <Dialog open={!!deleteTarget} onClose={() => !deleting && setDeleteTarget(null)}>
        <DialogTitle>Hapus Periode Akademik</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Yakin ingin menghapus periode <strong>{deleteTarget?.kode_periode} - {deleteTarget?.nama_periode}</strong>? Tindakan ini tidak dapat dibatalkan.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={deleting} onClick={() => setDeleteTarget(null)}>Batal</Button>
          <Button disabled={deleting} color="error" variant="contained" onClick={handleDeleteSingle}>
            {deleting ? 'Menghapus...' : 'Hapus'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Konfirmasi hapus banyak */}
      <Dialog open={deleteManyIds.length > 0} onClose={() => !deleting && setDeleteManyIds([])}>
        <DialogTitle>Hapus Beberapa Periode</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Yakin ingin menghapus {deleteManyIds.length} periode akademik yang dipilih? Tindakan ini tidak dapat dibatalkan.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={deleting} onClick={() => setDeleteManyIds([])}>Batal</Button>
          <Button disabled={deleting} color="error" variant="contained" onClick={handleDeleteMany}>
            {deleting ? 'Menghapus...' : `Hapus ${deleteManyIds.length} data`}
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardContent>
  );
}
