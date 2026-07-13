import type { AcademicRole } from 'src/lib/types';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useAuthContext } from 'src/components/providers';

import { RoleOptionListItem } from '../components';

const ROLE_OPTIONS = [
  {
    value: 'Admin Akademik' as AcademicRole,
    label: 'Admin Akademik',
    hint: 'Mengelola seluruh data periode akademik, termasuk membuat, mengedit, dan menghapus data.',
    icon: 'solar:user-check-bold-duotone',
  },
  {
    value: 'Dosen' as AcademicRole,
    label: 'Dosen',
    hint: 'Melihat data periode akademik dan mengekspor laporan (CSV/PDF).',
    icon: 'solar:users-group-two-rounded-bold-duotone',
  },
  {
    value: 'Staf Admisi' as AcademicRole,
    label: 'Staf Admisi',
    hint: 'Melihat data periode akademik tanpa akses ekspor.',
    icon: 'solar:user-id-bold-duotone',
  },
];

export function SignInView() {
  const { signIn } = useAuthContext();
  const [selectedRole, setSelectedRole] = useState<AcademicRole | null>(null);

  const handleSignIn = () => {
    if (selectedRole) {
      signIn(selectedRole);
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Left column — campus image + branding */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          flex: '0 0 58%',
          position: 'relative',
          overflow: 'hidden',
          px: 6,
          py: 8,
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/assetsmatana/campus-aerial.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(135deg, rgba(15, 23, 42, 0.75) 0%, rgba(37, 99, 235, 0.35) 100%)',
          },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 40,
            left: 48,
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Box
            component="img"
            src="/assetsmatana/apple-icon.png"
            alt="Universitas Matana"
            sx={{ width: 52, height: 'auto' }}
          />
          <Box sx={{ textAlign: 'left' }}>
            <Typography sx={{ fontSize: 22, fontWeight: 800, lineHeight: 1.1, color: '#fff' }}>Universitas</Typography>
            <Typography sx={{ fontSize: 22, fontWeight: 800, lineHeight: 1.1, color: '#fff' }}>Matana</Typography>
          </Box>
        </Box>

        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            color: '#fff',
            maxWidth: 500,
          }}
        >
          <Typography variant="h2" sx={{ fontWeight: 800, mb: 2, lineHeight: 1.15 }}>
            Sistem Manajemen
            <br />
            Periode Akademik
          </Typography>

          <Typography sx={{ fontSize: 17, opacity: 0.9, lineHeight: 1.65, maxWidth: 420, mx: 'auto' }}>
            Platform terintegrasi untuk mengelola seluruh periode akademik di lingkungan
            Universitas Matana — akses data perkuliahan, jadwal, dan informasi akademik
            dengan cepat dan efisien.
          </Typography>
        </Box>
      </Box>

      {/* Right column — login panel */}
      <Box
        sx={{
          flex: '0 0 42%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: '#fff',
          px: { xs: 3, lg: 6 },
          py: { xs: 6, lg: 8 },
        }}
      >
        <Box sx={{ width: 1, maxWidth: 400 }}>
          {/* Mobile logo */}
          <Box
            component="img"
            src="/assetsmatana/matana-logo-removebg-preview.png"
            alt="Universitas Matana"
            sx={{
              width: 56,
              height: 'auto',
              mb: 2.5,
              display: { xs: 'block', md: 'none' },
              mx: 'auto',
            }}
          />

          <Typography
            variant="h5"
            sx={{ mb: 0.5, fontWeight: 700, color: '#1E293B', letterSpacing: '-0.02em' }}
          >
            Masuk Sistem
          </Typography>

          <Typography variant="body2" sx={{ color: '#64748B', mb: 3.5 }}>
            Pilih peran Anda untuk melanjutkan
          </Typography>

          <Box sx={{ mb: 3, border: '1px solid', borderColor: 'grey.200', borderRadius: 1.5, overflow: 'hidden' }}>
            {ROLE_OPTIONS.map((option, index) => (
              <RoleOptionListItem
                key={option.value}
                role={option.value}
                label={option.label}
                hint={option.hint}
                icon={option.icon}
                selected={selectedRole === option.value}
                onSelect={() => setSelectedRole(option.value)}
                isLast={index === ROLE_OPTIONS.length - 1}
              />
            ))}
          </Box>

          <Button
            variant="contained"
            size="large"
            fullWidth
            disabled={!selectedRole}
            onClick={handleSignIn}
            sx={{
              py: 1.6,
              bgcolor: '#2563EB',
              '&:hover': { bgcolor: '#1D4ED8' },
              '&.Mui-disabled': { bgcolor: '#E2E8F0', color: '#94A3B8' },
              textTransform: 'none',
              fontWeight: 600,
              fontSize: 15,
              borderRadius: 1.5,
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            }}
          >
            Masuk Sistem
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
