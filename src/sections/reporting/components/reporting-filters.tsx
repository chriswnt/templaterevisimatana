import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import type { ReportPreset } from '../types';

type ReportingFiltersProps = {
  preset: ReportPreset;
  statusFilter: string;
  yearFilter: string;
  availableYears: string[];
  onPresetChange: (preset: ReportPreset) => void;
  onStatusChange: (status: string) => void;
  onYearChange: (year: string) => void;
};

export function ReportingFilters({
  preset,
  statusFilter,
  yearFilter,
  availableYears,
  onPresetChange,
  onStatusChange,
  onYearChange,
}: ReportingFiltersProps) {
  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', p: 2.5 }}>
      <TextField
        select
        size="small"
        label="Preset Laporan"
        value={preset}
        onChange={(e) => onPresetChange(e.target.value as ReportPreset)}
        sx={{ minWidth: 180 }}
      >
        <MenuItem value="all">Semua Periode</MenuItem>
        <MenuItem value="active">Hanya Aktif</MenuItem>
        <MenuItem value="exam">Memiliki UTS/UAS</MenuItem>
      </TextField>

      <TextField
        select
        size="small"
        label="Tahun Ajaran"
        value={yearFilter}
        onChange={(e) => onYearChange(e.target.value)}
        sx={{ minWidth: 160 }}
      >
        <MenuItem value="">Semua Tahun</MenuItem>
        {availableYears.map((year) => (
          <MenuItem key={year} value={year}>{year}</MenuItem>
        ))}
      </TextField>

      <TextField
        select
        size="small"
        label="Filter Status"
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
        sx={{ minWidth: 140 }}
      >
        <MenuItem value="">Semua</MenuItem>
        <MenuItem value="active">Aktif</MenuItem>
        <MenuItem value="inactive">Tidak Aktif</MenuItem>
        <MenuItem value="locked">Terkunci</MenuItem>
      </TextField>
    </Box>
  );
}
