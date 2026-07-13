import type { ReactNode } from 'react';
import type { Theme, SxProps } from '@mui/material/styles';

export interface PageHeroBannerProps {
  title: string;
  description: string;
  badge?: string;
  infoBadge?: string;
  image?: string;
  action?: ReactNode;
  sx?: SxProps<Theme>;
}
