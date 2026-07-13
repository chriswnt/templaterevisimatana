import type { AcademicPeriod } from 'src/lib/types';
import type { Column } from 'src/components/data-table/types';

import { useMemo, useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { fDate } from 'src/utils/format-time';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { DataTable } from 'src/components/data-table';
import { StatusBadge } from 'src/components/status-badge';
import { useAuthContext } from 'src/components/providers';
import { PageHeroBanner } from 'src/components/page-hero-banner';

import { useAcademicPeriods } from 'src/sections/academic-period/hooks';

import { ReportingFilters } from '../components/reporting-filters';
import { ReportingBarChart } from '../components/reporting-bar-chart';
import { ReportingSummaryCards } from '../components/reporting-summary-cards';
import { ReportingPresetSelector } from '../components/reporting-preset-selector';

import type { ChartSeries, ReportPreset } from '../types';

function exportToPdf(data: AcademicPeriod[]) {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const rows = data
    .map(
      (d) => `
        <tr>
          <td>${d.kode_periode}</td>
          <td>${d.nama_periode}</td>
          <td>${d.tahun_ajaran}</td>
          <td>${d.semester}</td>
          <td>${d.status_aktif ? 'Aktif' : d.is_locked ? 'Terkunci' : 'Tidak Aktif'}</td>
          <td>${fDate(d.tanggal_awal_kuliah)}</td>
          <td>${fDate(d.tanggal_akhir_kuliah)}</td>
        </tr>`
    )
    .join('');

  printWindow.document.write(`
    <html>
      <head>
        <title>Laporan Periode Akademik</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 24px; }
          h1 { font-size: 20px; margin-bottom: 4px; color: #0A2E5A; }
          p { font-size: 12px; color: #666; margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; font-size: 12px; }
          th { background: #0A2E5A; color: #fff; padding: 10px 8px; text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; }
          td { padding: 8px; border-bottom: 1px solid #e0e0e0; }
          tr:nth-child(even) { background: #f8fafc; }
          .footer { margin-top: 20px; font-size: 10px; color: #999; text-align: center; }
        </style>
      </head>
      <body>
        <h1>Laporan Periode Akademik</h1>
        <p>Universitas Matana — Sistem Manajemen Periode Akademik</p>
        <table>
          <thead>
            <tr>
              <th>Kode</th><th>Nama Periode</th><th>Tahun Ajaran</th><th>Semester</th><th>Status</th><th>Tgl Mulai</th><th>Tgl Akhir</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
        <div class="footer">Dicetak pada ${new Date().toLocaleDateString('id-ID')} — ${data.length} total periode</div>
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.print();
}

export function ReportingView() {
  const { currentRole } = useAuthContext();
  const { data: apiData, isLoading } = useAcademicPeriods();
  const [preset, setPreset] = useState<ReportPreset>('all');
  const [statusFilter, setStatusFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handlePageChange = useCallback((newPage: number) => setPage(newPage), []);
  const handleRowsPerPageChange = useCallback((rpp: number) => { setRowsPerPage(rpp); setPage(0); }, []);

  const canExport = currentRole === 'Admin Akademik' || currentRole === 'Dosen';

  const summary = useMemo(() => ({
    totalPeriods: apiData.length,
    activePeriods: apiData.filter((d) => d.status_aktif).length,
    inactivePeriods: apiData.length - apiData.filter((d) => d.status_aktif).length,
    lockedPeriods: apiData.filter((d) => d.is_locked).length,
  }), [apiData]);

  const filteredData = useMemo(() => {
    let result = [...apiData];

    if (preset === 'active') {
      result = result.filter((d) => d.status_aktif);
    } else if (preset === 'exam') {
      result = result.filter((d) => d.tanggal_awal_uts && d.tanggal_awal_uas);
    }

    if (statusFilter === 'active') result = result.filter((d) => d.status_aktif);
    else if (statusFilter === 'inactive') result = result.filter((d) => !d.status_aktif && !d.is_locked);
    else if (statusFilter === 'locked') result = result.filter((d) => d.is_locked);

    if (yearFilter) result = result.filter((d) => d.tahun_ajaran === yearFilter);

    return result;
  }, [apiData, preset, statusFilter, yearFilter]);

  const availableYears = useMemo(() => {
    const years = [...new Set(apiData.map((d) => d.tahun_ajaran))];
    return years.sort();
  }, [apiData]);

  const chartData = useMemo(() => {
    const years = [...new Set(filteredData.map((d) => d.tahun_ajaran))].sort();
    const semesters = ['Ganjil', 'Genap', 'Pendek'];
    const series: ChartSeries[] = semesters.map((sem) => ({
      name: sem,
      data: years.map(
        (year) => filteredData.filter((d) => d.tahun_ajaran === year && d.semester === sem).length
      ),
    }));
    return { categories: years, series };
  }, [filteredData]);

  const handleExportCSV = () => {
    const headers = ['Kode', 'Nama Periode', 'Tahun Ajaran', 'Semester', 'Status', 'Tgl Mulai', 'Tgl Akhir'];
    const rows = filteredData.map((d) => [
      d.kode_periode,
      d.nama_periode,
      d.tahun_ajaran,
      d.semester,
      d.status_aktif ? 'Aktif' : d.is_locked ? 'Terkunci' : 'Tidak Aktif',
      d.tanggal_awal_kuliah,
      d.tanggal_akhir_kuliah,
    ]);

    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `laporan-periode-akademik-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const columns: Column<AcademicPeriod>[] = useMemo(
    () => [
      { id: 'kode_periode', label: 'Kode', width: 140, sortable: true },
      { id: 'nama_periode', label: 'Nama', sortable: true },
      { id: 'tahun_ajaran', label: 'Tahun Ajaran', width: 130, sortable: true },
      { id: 'semester', label: 'Semester', width: 110, sortable: true },
      {
        id: 'status_aktif',
        label: 'Status',
        width: 130,
        renderCell: (row) => {
          const status = row.is_locked ? 'locked' : row.status_aktif ? 'active' : 'inactive';
          return <StatusBadge status={status} size="sm" />;
        },
      },
      {
        id: 'tgl_mulai',
        label: 'Tgl Mulai',
        renderCell: (row) => fDate(row.tanggal_awal_kuliah),
      },
      {
        id: 'tgl_akhir',
        label: 'Tgl Akhir',
        renderCell: (row) => fDate(row.tanggal_akhir_kuliah),
      },
    ],
    []
  );

  return (
    <DashboardContent maxWidth="xl">
      <PageHeroBanner
        title="Laporan Akademik"
        description="Lihat dan ekspor laporan data periode akademik Universitas Matana secara real-time."
        badge="Sistem Admin Akademik"
        infoBadge={`${apiData.length} total periode | Data real-time`}
        image="/assetsmatana/professional-team-man-woman-business.jpg"
      />

      <ReportingSummaryCards summary={summary} loading={isLoading} />

      <Box sx={{ mt: 3 }}>
        <ReportingBarChart
          categories={chartData.categories}
          series={chartData.series}
          loading={isLoading}
        />
      </Box>

      <DataTable
        columns={columns}
        data={filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
        total={filteredData.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        getRowId={(row) => row.id}
        loading={isLoading}
        emptyTitle="Tidak ada data"
        emptyDescription="Coba ubah filter atau preset laporan."
        toolbar={
          <Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 2,
                px: 2.5,
                pt: 2.5,
              }}
            >
              <Typography variant="h6">Data Periode Akademik</Typography>
              <ReportingPresetSelector preset={preset} onChange={setPreset} />
            </Box>
            <ReportingFilters
              preset={preset}
              statusFilter={statusFilter}
              yearFilter={yearFilter}
              availableYears={availableYears}
              onPresetChange={setPreset}
              onStatusChange={setStatusFilter}
              onYearChange={setYearFilter}
            />
          </Box>
        }
      />

      {canExport && (
        <Stack direction="row" spacing={1.5} sx={{ justifyContent: 'flex-end', mt: 2 }}>
          <Button
            variant="outlined"
            startIcon={<Iconify icon="solar:file-pdf-bold-duotone" width={20} />}
            onClick={() => exportToPdf(filteredData)}
            sx={{ borderRadius: 1.5, textTransform: 'none', fontWeight: 500 }}
          >
            Cetak PDF
          </Button>
          <Button
            variant="contained"
            startIcon={<Iconify icon="solar:export-bold-duotone" width={20} />}
            onClick={handleExportCSV}
            sx={{ borderRadius: 1.5, textTransform: 'none', fontWeight: 500 }}
          >
            Export CSV
          </Button>
        </Stack>
      )}
    </DashboardContent>
  );
}
