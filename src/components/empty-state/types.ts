import type { Theme, SxProps } from '@mui/material/styles';
import type { IconifyProps } from 'src/components/iconify';

export interface EmptyStateProps {
  icon?: IconifyProps['icon'];
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  sx?: SxProps<Theme>;
}
