import type { AcademicRole } from 'src/lib/types';

export interface RoleOption {
  value: AcademicRole;
  label: string;
  hint: string;
  icon: string;
}
