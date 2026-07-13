import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';

const STYLE = { bg: '#F0F7FF', iconBg: 'linear-gradient(135deg, #0F4C81 0%, #2563EB 100%)', color: '#0F4C81' };

export function OverviewQuickActions() {
  const router = useRouter();

  const actions = [
    {
      label: 'Buat Periode Baru',
      description: 'Tambah periode akademik baru',
      icon: 'solar:calendar-add-bold-duotone',
      path: '/academic-period',
    },
    {
      label: 'Lihat Laporan',
      description: 'Akses laporan dan statistik',
      icon: 'solar:chart-2-bold-duotone',
      path: '/reporting',
    },
    {
      label: 'Pengaturan',
      description: 'Kelola preferensi sistem',
      icon: 'solar:settings-bold-duotone',
      path: '/settings',
    },
  ];

  return (
    <Card
      sx={{
        p: 3,
        borderRadius: '18px',
        boxShadow: (theme) => `0 4px 20px ${theme.vars.palette.grey['500Channel']}15`,
        height: '100%',
        border: '1px solid rgba(37, 99, 235, 0.08)',
      }}
    >
      <Typography variant="h6" sx={{ mb: 2.5, fontWeight: 700, fontSize: 18 }}>
        Aksi Cepat
      </Typography>

      <Stack spacing={2}>
        {actions.map((action) => (
          <Box
            key={action.label}
            onClick={() => router.push(action.path)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              p: 2,
              borderRadius: 3,
              bgcolor: STYLE.bg,
              cursor: 'pointer',
              border: '1px solid rgba(37, 99, 235, 0.08)',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: (theme) => `0 8px 30px ${theme.vars.palette.grey['500Channel']}20`,
              },
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: STYLE.iconBg,
                boxShadow: '0 4px 12px rgba(15, 76, 129, 0.25)',
                flexShrink: 0,
              }}
            >
              <Iconify icon={action.icon} width={26} sx={{ color: '#FFFFFF' }} />
            </Box>

            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: 14, color: STYLE.color }}>
                {action.label}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 0.25, fontSize: 12 }}>
                {action.description}
              </Typography>
            </Box>

            <Iconify icon="solar:arrow-right-linear" width={20} sx={{ color: STYLE.color, opacity: 0.4 }} />
          </Box>
        ))}
      </Stack>
    </Card>
  );
}
