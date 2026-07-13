import Box from '@mui/material/Box';

import type { StatusBadgeProps } from './types';

const STATUS_STYLES: Record<string, { bg: string; label: string; dot: string }> = {
  active: { bg: '#F0FDF4', label: 'Aktif', dot: '#16A34A' },
  inactive: { bg: '#FFF7ED', label: 'Tidak Aktif', dot: '#EA580C' },
  locked: { bg: '#FEF2F2', label: 'Terkunci', dot: '#DC2626' },
};

export function StatusBadge({ status, size = 'md', sx }: StatusBadgeProps) {
  const config = STATUS_STYLES[status] || STATUS_STYLES.active;

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.5,
        px: size === 'sm' ? 1.25 : 1.5,
        py: size === 'sm' ? 0.25 : 0.35,
        borderRadius: 1.5,
        bgcolor: config.bg,
        color: config.dot,
        fontSize: size === 'sm' ? 11 : 12,
        fontWeight: 600,
        letterSpacing: 0.2,
        lineHeight: 1.5,
        ...sx,
      }}
    >
      <Box
        sx={{
          width: size === 'sm' ? 6 : 7,
          height: size === 'sm' ? 6 : 7,
          borderRadius: '50%',
          bgcolor: config.dot,
          flexShrink: 0,
        }}
      />
      {config.label}
    </Box>
  );
}
