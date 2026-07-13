import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';

import type { SummaryCardProps } from './types';

export function SummaryCard({
  icon,
  value,
  label,
  color = 'primary',
  trend,
  sx,
}: SummaryCardProps) {
  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 3,
        p: 3,
        borderRadius: '18px',
        bgcolor: '#F0F7FF',
        boxShadow: (theme) => `0 4px 20px ${theme.vars.palette.grey['500Channel']}15`,
        border: '1px solid rgba(37, 99, 235, 0.08)',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: (theme) => `0 12px 40px ${theme.vars.palette.grey['500Channel']}25`,
        },
        ...sx,
      }}
    >
      <Box
        sx={{
          width: 60,
          height: 60,
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0F4C81 0%, #2563EB 100%)',
          boxShadow: '0 4px 12px rgba(15, 76, 129, 0.25)',
          flexShrink: 0,
        }}
      >
        <Iconify icon={icon} width={32} sx={{ color: '#FFFFFF' }} />
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h4" sx={{ mb: 0.25, fontWeight: 700, fontSize: 28 }}>
          {typeof value === 'number' ? value.toLocaleString() : value}
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, fontSize: 13 }}>
          {label}
        </Typography>

        {trend && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
            <Iconify
              icon={trend.isUp ? 'solar:arrow-up-bold-duotone' : 'solar:arrow-down-bold-duotone'}
              width={16}
              sx={{ color: trend.isUp ? '#0F4C81' : '#DC2626' }}
            />
            <Typography
              variant="caption"
              sx={{ color: trend.isUp ? '#0F4C81' : '#DC2626', fontWeight: 600 }}
            >
              {trend.value}%
            </Typography>
          </Box>
        )}
      </Box>
    </Card>
  );
}
