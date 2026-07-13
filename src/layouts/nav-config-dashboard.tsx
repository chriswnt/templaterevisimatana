import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const icon = (name: string) => <Iconify width={22} icon={name} />;

export type NavItem = {
  title: string;
  path: string;
  icon: React.ReactNode;
  info?: React.ReactNode;
};

export const navData = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: icon('solar:home-2-bold-duotone'),
  },
  {
    title: 'Academic Period',
    path: '/academic-period',
    icon: icon('solar:calendar-bold-duotone'),
  },
  {
    title: 'Reporting',
    path: '/reporting',
    icon: icon('solar:file-text-bold-duotone'),
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: icon('solar:settings-bold-duotone'),
  },
];
