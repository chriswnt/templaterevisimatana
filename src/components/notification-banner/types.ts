import type { Theme, SxProps } from '@mui/material/styles';

export type NotificationType = 'success' | 'error' | 'warning' | 'info' | 'loading';

export interface NotificationBannerProps {
  type: NotificationType;
  message: string;
  onClose?: () => void;
  sx?: SxProps<Theme>;
}
