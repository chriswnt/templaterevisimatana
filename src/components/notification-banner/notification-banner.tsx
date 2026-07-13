import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';

import { Iconify } from 'src/components/iconify';

import type { NotificationBannerProps } from './types';

export function NotificationBanner({ type, message, onClose, sx }: NotificationBannerProps) {
  if (type === 'loading') {
    return (
      <Box sx={{ width: 1, ...sx }}>
        <LinearProgress />
        <Alert severity="info" icon={false} sx={{ borderRadius: 0 }}>
          {message}
        </Alert>
      </Box>
    );
  }

  const iconMap = {
    success: 'solar:check-circle-bold-duotone',
    error: 'solar:close-circle-bold-duotone',
    warning: 'solar:danger-triangle-bold-duotone',
    info: 'solar:info-circle-bold-duotone',
  };

  return (
    <Alert
      severity={type}
      icon={<Iconify icon={iconMap[type]} width={22} />}
      onClose={onClose}
      sx={{ ...sx }}
    >
      {message}
    </Alert>
  );
}
