import type { Theme, SxProps } from '@mui/material/styles';
import type { IconifyProps } from 'src/components/iconify';

export interface SummaryCardProps {
  icon: IconifyProps['icon'];
  value: string | number;
  label: string;
  color?: 'primary' | 'success' | 'warning' | 'error';
  trend?: {
    value: number;
    isUp: boolean;
  };
  sx?: SxProps<Theme>;
}
