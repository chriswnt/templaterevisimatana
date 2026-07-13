import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';

import type { EmptyStateProps } from './types';

export function EmptyState({
  icon = 'solar:box-minimalistic-bold-duotone',
  title,
  description,
  actionLabel,
  onAction,
  sx,
}: EmptyStateProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        textAlign: 'center',
        ...sx,
      }}
    >
      <Iconify icon={icon} width={64} sx={{ mb: 2, color: 'text.disabled', opacity: 0.5 }} />

      <Typography variant="h6" sx={{ mb: 0.5, color: 'text.secondary' }}>
        {title}
      </Typography>

      {description && (
        <Typography variant="body2" sx={{ mb: 2, color: 'text.disabled', maxWidth: 360 }}>
          {description}
        </Typography>
      )}

      {actionLabel && onAction && (
        <Button variant="contained" color="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </Box>
  );
}
