import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Select from '@mui/material/Select';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { useAuthContext } from 'src/components/providers';
import { PageHeroBanner } from 'src/components/page-hero-banner';

import type { ThemeMode } from '../types';

export function SettingsView() {
  const { currentRole, setCurrentRole } = useAuthContext();
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');

  const roles = ['Admin Akademik', 'Staf Admisi', 'Dosen'] as const;

  return (
    <DashboardContent>
      <PageHeroBanner
        title="Pengaturan Sistem"
        description="Atur preferensi tampilan, peran pengguna, dan lihat informasi aplikasi."
        badge="Sistem Admin Akademik"
        infoBadge={`Versi ${CONFIG.appVersion}`}
        image="/assetsmatana/professional-team-man-woman-business.jpg"
      />

      <Card
        sx={{
          p: 3,
          mb: 3,
          borderRadius: '18px',
          boxShadow: (theme) => `0 4px 20px ${theme.vars.palette.grey['500Channel']}12`,
          border: '1px solid rgba(255,255,255,0.6)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)',
            }}
          >
            <Iconify icon="solar:palette-bold-duotone" width={20} sx={{ color: '#FFFFFF' }} />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 16 }}>Tema</Typography>
        </Box>

        <ToggleButtonGroup
          value={themeMode}
          exclusive
          onChange={(_, newValue) => {
            if (newValue) setThemeMode(newValue);
          }}
          sx={{
            '& .MuiToggleButton-root': {
              borderRadius: 1.5,
              border: '1px solid',
              borderColor: (theme) => theme.vars.palette.divider,
              textTransform: 'none',
              fontWeight: 500,
              fontSize: 13,
              px: 2,
              py: 1,
              '&.Mui-selected': {
                bgcolor: '#EFF6FF',
                color: '#2563EB',
                borderColor: '#93C5FD',
                '&:hover': { bgcolor: '#DBEAFE' },
              },
            },
          }}
        >
          <ToggleButton value="light">
            <Iconify icon="solar:sun-bold-duotone" width={18} sx={{ mr: 0.75 }} />
            Terang
          </ToggleButton>
          <ToggleButton value="dark">
            <Iconify icon="solar:moon-bold-duotone" width={18} sx={{ mr: 0.75 }} />
            Gelap
          </ToggleButton>
          <ToggleButton value="system">
            <Iconify icon="solar:laptop-minimalistic-bold-duotone" width={18} sx={{ mr: 0.75 }} />
            Sistem
          </ToggleButton>
        </ToggleButtonGroup>
      </Card>

      <Card
        sx={{
          p: 3,
          mb: 3,
          borderRadius: '18px',
          boxShadow: (theme) => `0 4px 20px ${theme.vars.palette.grey['500Channel']}12`,
          border: '1px solid rgba(255,255,255,0.6)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #0F4C81 0%, #2563EB 100%)',
              boxShadow: '0 4px 12px rgba(15, 76, 129, 0.25)',
            }}
          >
            <Iconify icon="solar:user-check-bold-duotone" width={20} sx={{ color: '#FFFFFF' }} />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 16 }}>Peran (Role)</Typography>
        </Box>

        <FormControl fullWidth size="small" sx={{ maxWidth: 320 }}>
          <InputLabel>Pilih Peran</InputLabel>
          <Select
            value={currentRole}
            label="Pilih Peran"
            onChange={(e) => setCurrentRole(e.target.value as typeof currentRole)}
            sx={{
              borderRadius: 1.5,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: (theme) => theme.vars.palette.divider,
              },
            }}
          >
            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Card>

      <Card
        sx={{
          p: 3,
          borderRadius: '18px',
          boxShadow: (theme) => `0 4px 20px ${theme.vars.palette.grey['500Channel']}12`,
          border: '1px solid rgba(255,255,255,0.6)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #0F4C81 0%, #2563EB 100%)',
              boxShadow: '0 4px 12px rgba(15, 76, 129, 0.25)',
            }}
          >
            <Iconify icon="solar:info-circle-bold-duotone" width={20} sx={{ color: '#FFFFFF' }} />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 16 }}>Tentang</Typography>
        </Box>

        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1, fontSize: 14 }}>
          Sistem Manajemen Periode Akademik
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1, fontSize: 14 }}>
          Versi: <strong>{CONFIG.appVersion}</strong>
        </Typography>

        <Divider sx={{ my: 2, borderColor: (theme) => theme.vars.palette.divider }} />

        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0, fontSize: 13 }}>
          Universitas Matana — Sistem Manajemen Periode Akademik
        </Typography>
      </Card>
    </DashboardContent>
  );
}
