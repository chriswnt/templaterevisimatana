import type { ReactNode } from 'react';
import type { SortConfig } from 'src/lib/types';

export interface Column<T> {
  id: string;
  label: string;
  width?: string | number;
  align?: 'left' | 'right' | 'center';
  sortable?: boolean;
  renderCell?: (row: T) => ReactNode;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  total?: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  rowsPerPageOptions?: number[];
  sortConfig?: SortConfig;
  onSortChange?: (key: string) => void;
  primaryKey?: string;
  onPrimaryClick?: (row: T) => void;
  getRowId: (row: T) => string;
  loading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  selected?: string[];
  onSelectAllRows?: (selected: string[]) => void;
  onSelectRow?: (id: string) => void;
  toolbar?: ReactNode;
}
