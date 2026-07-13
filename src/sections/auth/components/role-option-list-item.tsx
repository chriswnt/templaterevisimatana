import type { AcademicRole } from 'src/lib/types';

import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';

type RoleOptionListItemProps = {
  role: AcademicRole;
  label: string;
  hint: string;
  icon: string;
  selected: boolean;
  onSelect: () => void;
  isLast: boolean;
};

export function RoleOptionListItem({
  role,
  label,
  hint,
  icon,
  selected,
  onSelect,
  isLast,
}: RoleOptionListItemProps) {
  return (
    <>
      <Box
        onClick={onSelect}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          py: 1.75,
          px: 1.5,
          cursor: 'pointer',
          borderRadius: 1,
          transition: 'background-color 0.12s ease',
          '&:hover': { bgcolor: 'rgba(37, 99, 235, 0.04)' },
        }}
      >
        <Iconify
          icon={icon}
          width={22}
          sx={{ color: selected ? '#2563EB' : 'text.secondary', flexShrink: 0 }}
        />

        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography
            variant="body1"
            sx={{ fontWeight: 500, color: selected ? '#2563EB' : 'text.primary' }}
          >
            {label}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.25 }}>
            {hint}
          </Typography>
        </Box>

        <Radio
          checked={selected}
          sx={{
            flexShrink: 0,
            '& .MuiSvgIcon-root': { width: 20, height: 20 },
            '&.Mui-checked': { color: '#2563EB' },
          }}
        />
      </Box>

      {!isLast && <Divider sx={{ mx: 1.5 }} />}
    </>
  );
}
