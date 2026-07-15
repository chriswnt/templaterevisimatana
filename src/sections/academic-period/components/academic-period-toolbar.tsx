import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import { Iconify } from 'src/components/iconify';

import type { FilterState } from '../types';

type AcademicPeriodToolbarProps = {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  role: string;
  onCreateClick: () => void;
  availableYears: string[];
};

export function AcademicPeriodToolbar({
  filters,
  onFilterChange,
  role,
  onCreateClick,
  availableYears,
}: AcademicPeriodToolbarProps) {
  const canManage = role === 'Admin Akademik' || role === 'Staf Admisi';

  const handleReset = () => {
    onFilterChange('search', '');
    onFilterChange('status', '');
    onFilterChange('semester', '');
    onFilterChange('tahun_ajaran', '');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        flexWrap: 'wrap',
        px: 2.5,
        py: 2,
        borderBottom: (theme) => `1px solid ${theme.vars.palette.divider}`,
        bgcolor: '#FAFBFC',
      }}
    >
      <TextField
        size="small"
        placeholder="Cari periode..."
        value={filters.search}
        onChange={(e) => onFilterChange('search', e.target.value)}
        slotProps={{
          input: {
            startAdornment: <Iconify icon="solar:magnifer-bold-duotone" width={18} sx={{ color: 'text.secondary', mr: 0.5 }} />,
          },
        }}
        sx={{
          minWidth: 220,
          '& .MuiOutlinedInput-root': {
            bgcolor: '#FFFFFF',
            borderRadius: 1.5,
          },
        }}
      />

      <TextField
        select
        size="small"
        label="Tahun Ajaran"
        value={filters.tahun_ajaran}
        onChange={(e) => onFilterChange('tahun_ajaran', e.target.value)}
        sx={{
          minWidth: 160,
          '& .MuiOutlinedInput-root': { bgcolor: '#FFFFFF', borderRadius: 1.5 },
        }}
      >
        <MenuItem value="">Semua Tahun</MenuItem>
        {availableYears.map((year) => (
          <MenuItem key={year} value={year}>{year}</MenuItem>
        ))}
      </TextField>

      <TextField
        select
        size="small"
        label="Status"
        value={filters.status}
        onChange={(e) => onFilterChange('status', e.target.value)}
        sx={{
          minWidth: 140,
          '& .MuiOutlinedInput-root': { bgcolor: '#FFFFFF', borderRadius: 1.5 },
        }}
      >
        <MenuItem value="">Semua Status</MenuItem>
        <MenuItem value="active">Aktif</MenuItem>
        <MenuItem value="inactive">Tidak Aktif</MenuItem>
        <MenuItem value="locked">Terkunci</MenuItem>
      </TextField>

      <TextField
        select
        size="small"
        label="Semester"
        value={filters.semester}
        onChange={(e) => onFilterChange('semester', e.target.value)}
        sx={{
          minWidth: 140,
          '& .MuiOutlinedInput-root': { bgcolor: '#FFFFFF', borderRadius: 1.5 },
        }}
      >
        <MenuItem value="">Semua Semester</MenuItem>
        <MenuItem value="Ganjil">Ganjil</MenuItem>
        <MenuItem value="Genap">Genap</MenuItem>
        <MenuItem value="Pendek">Pendek</MenuItem>
      </TextField>

      <Button
        variant="outlined"
        size="small"
        startIcon={<Iconify icon="solar:refresh-bold-duotone" width={16} />}
        onClick={handleReset}
        sx={{
          borderRadius: 1.5,
          textTransform: 'none',
          fontWeight: 500,
          fontSize: 13,
          height: 40,
          borderColor: (theme) => theme.vars.palette.divider,
          color: 'text.secondary',
        }}
      >
        Reset Filter
      </Button>

      <Button
        variant="contained"
        size="small"
        startIcon={<Iconify icon="solar:filters-bold-duotone" width={16} />}
        sx={{
          borderRadius: 1.5,
          textTransform: 'none',
          fontWeight: 500,
          fontSize: 13,
          height: 40,
          bgcolor: '#0F4C81',
          '&:hover': { bgcolor: '#0A2E5A' },
        }}
      >
        Apply Filter
      </Button>

      <Box sx={{ flexGrow: 1 }} />

      {canManage && (
        <Button
          variant="contained"
          color="primary"
          startIcon={<Iconify icon="solar:add-circle-bold-duotone" width={18} />}
          onClick={onCreateClick}
          sx={{
            borderRadius: 1.5,
            textTransform: 'none',
            fontWeight: 600,
            fontSize: 13,
            height: 40,
            bgcolor: '#0F4C81',
            '&:hover': { bgcolor: '#0A2E5A' },
            boxShadow: '0 4px 14px rgba(15, 76, 129, 0.3)',
          }}
        >
          Tambah Periode
        </Button>
      )}
    </Box>
  );
}
