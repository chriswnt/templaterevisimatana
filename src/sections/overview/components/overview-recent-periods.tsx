import type { AcademicPeriod } from 'src/lib/types';
import type { Column } from 'src/components/data-table/types';

import { useMemo, useCallback } from 'react';

import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';

import { DataTable } from 'src/components/data-table';
import { useAuthContext } from 'src/components/providers';
import { StatusBadge } from 'src/components/status-badge';

type OverviewRecentPeriodsProps = {
  periods: AcademicPeriod[];
  loading?: boolean;
};

export function OverviewRecentPeriods({ periods, loading }: OverviewRecentPeriodsProps) {
  const router = useRouter();
  const { currentRole } = useAuthContext();
  const isAdmin = currentRole === 'Admin Akademik';
  const recentPeriods = useMemo(() => [...periods].slice(0, 5), [periods]);

  const handleCodeClick = useCallback(
    (item: AcademicPeriod) => {
      router.push(`/academic-period/edit/${item.id}`);
    },
    [router]
  );

  const columns: Column<AcademicPeriod>[] = useMemo(
    () => [
      { id: 'kode_periode', label: 'Kode', width: 140 },
      { id: 'nama_periode', label: 'Nama Periode' },
      { id: 'semester', label: 'Semester', width: 110 },
      {
        id: 'status_aktif',
        label: 'Status',
        width: 130,
        renderCell: (row) => {
          const status = row.is_locked ? 'locked' : row.status_aktif ? 'active' : 'inactive';
          return <StatusBadge status={status} size="sm" />;
        },
      },
    ],
    []
  );

  if (loading) {
    return (
      <DataTable
        columns={columns}
        data={[]}
        page={0}
        rowsPerPage={5}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
        getRowId={() => ''}
        loading
        toolbar={<Typography variant="h6" sx={{ px: 2.5, pt: 2.5 }}>Periode Terbaru</Typography>}
      />
    );
  }

  return (
    <DataTable
      columns={columns}
      data={recentPeriods}
      page={0}
      rowsPerPage={5}
      onPageChange={() => {}}
      onRowsPerPageChange={() => {}}
      getRowId={(row) => row.id}
      primaryKey={isAdmin ? 'kode_periode' : undefined}
      onPrimaryClick={isAdmin ? handleCodeClick : undefined}
      emptyTitle="Belum ada data"
      toolbar={<Typography variant="h6" sx={{ px: 2.5, pt: 2.5 }}>Periode Terbaru</Typography>}
    />
  );
}
