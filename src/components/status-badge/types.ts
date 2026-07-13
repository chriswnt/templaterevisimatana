import type { Theme, SxProps } from '@mui/material/styles';

export type StatusValue = 'active' | 'inactive' | 'locked';

export interface StatusBadgeProps {
  status: StatusValue;
  size?: 'sm' | 'md';
  sx?: SxProps<Theme>;
}
