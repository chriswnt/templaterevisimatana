import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import { useEffect } from 'react';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import Drawer, { drawerClasses } from '@mui/material/Drawer';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { Scrollbar } from 'src/components/scrollbar';

import type { NavItem } from '../nav-config-dashboard';

// ----------------------------------------------------------------------

export type NavContentProps = {
  data: NavItem[];
  slots?: {
    topArea?: React.ReactNode;
    bottomArea?: React.ReactNode;
  };
  sx?: SxProps<Theme>;
};

export function NavDesktop({
  sx,
  data,
  slots,
  layoutQuery,
}: NavContentProps & { layoutQuery: Breakpoint }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        pt: 3,
        px: 2.5,
        top: 0,
        left: 0,
        height: 1,
        display: 'none',
        position: 'fixed',
        flexDirection: 'column',
        zIndex: 'var(--layout-nav-zIndex)',
        width: 'var(--layout-nav-vertical-width)',
        background: 'linear-gradient(180deg, #0A2E5A 0%, #0F4C81 40%, #1A6BB5 100%)',
        borderRight: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '4px 0 30px rgba(10, 46, 90, 0.35)',
        [theme.breakpoints.up(layoutQuery)]: {
          display: 'flex',
        },
        ...sx,
      }}
    >
      <NavContent data={data} slots={slots} />
    </Box>
  );
}

// ----------------------------------------------------------------------

export function NavMobile({
  sx,
  data,
  open,
  slots,
  onClose,
}: NavContentProps & { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          pt: 3,
          px: 2.5,
          overflow: 'unset',
          width: 'var(--layout-nav-mobile-width)',
          background: 'linear-gradient(180deg, #0A2E5A 0%, #0F4C81 40%, #1A6BB5 100%)',
          ...sx,
        },
      }}
    >
      <NavContent data={data} slots={slots} />
    </Drawer>
  );
}

// ----------------------------------------------------------------------

export function NavContent({ data, slots, sx }: NavContentProps) {
  const pathname = usePathname();

  return (
    <>
      <Box sx={{ textAlign: 'center', pt: 1.5, pb: 1 }}>
        <Box
          component="img"
          src="/assetsmatana/apple-icon.png"
          alt="Universitas Matana"
          sx={{ width: 52, height: 52, mx: 'auto', mb: 1.5, borderRadius: 1.5, boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}
        />

        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#FFFFFF', lineHeight: 1.2, fontSize: 15 }}>
          Universitas Matana
        </Typography>

        <Typography
          variant="caption"
          sx={{ color: 'rgba(255,255,255,0.6)', display: 'block', mt: 0.25, mb: 1.5, fontSize: 11, letterSpacing: 0.3 }}
        >
          Unggul, Inovatif, Berkarakter
        </Typography>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)', mx: 1 }} />
      </Box>

      {slots?.topArea}

      <Scrollbar fillContent>
        <Box
          component="nav"
          sx={[
            {
              display: 'flex',
              flex: '1 1 auto',
              flexDirection: 'column',
            },
            ...(Array.isArray(sx) ? sx : [sx]),
          ]}
        >
          <Box
            component="ul"
            sx={{
              gap: 0.75,
              display: 'flex',
              flexDirection: 'column',
              px: 1,
              py: 0.5,
            }}
          >
            {data.map((item) => {
              const isActived = item.path === pathname;

              return (
                <ListItem disableGutters disablePadding key={item.title}>
                  <ListItemButton
                    disableGutters
                    component={RouterLink}
                    href={item.path}
                    sx={[
                      (theme) => ({
                        pl: 2.5,
                        py: 1.35,
                        gap: 2,
                        pr: 2,
                        borderRadius: 2.5,
                        typography: 'body2',
                        fontWeight: 500,
                        color: 'rgba(255,255,255,0.6)',
                        minHeight: 46,
                        transition: theme.transitions.create(['background-color', 'color', 'box-shadow', 'transform'], {
                          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                          duration: 250,
                        }),
                        '&:hover': {
                          bgcolor: 'rgba(255,255,255,0.1)',
                          color: '#FFFFFF',
                          transform: 'translateX(3px)',
                          [`& .nav-item-icon`]: {
                            color: '#FFFFFF',
                          },
                        },
                        ...(isActived && {
                          fontWeight: 600,
                          color: '#FFFFFF',
                          bgcolor: 'rgba(255,255,255,0.15)',
                          backdropFilter: 'blur(8px)',
                          boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            left: 0,
                            top: 8,
                            bottom: 8,
                            width: 3.5,
                            borderRadius: 2,
                            background: 'linear-gradient(180deg, #60A5FA, #3B82F6)',
                          },
                          '&:hover': {
                            bgcolor: 'rgba(255,255,255,0.2)',
                            transform: 'translateX(3px)',
                          },
                        }),
                      }),
                    ]}
                  >
                    <Box
                      component="span"
                      className="nav-item-icon"
                      sx={{
                        width: 24,
                        height: 24,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isActived ? '#FFFFFF' : 'rgba(255,255,255,0.6)',
                        transition: 'color 0.2s',
                        '& svg': { width: 22, height: 22 },
                      }}
                    >
                      {item.icon}
                    </Box>

                    <Box component="span" sx={{ flexGrow: 1, fontSize: 14, letterSpacing: 0.2 }}>
                      {item.title}
                    </Box>

                    {item.info && item.info}
                  </ListItemButton>
                </ListItem>
              );
            })}
          </Box>
        </Box>
      </Scrollbar>

      {slots?.bottomArea}

      <Box sx={{ px: 2, py: 1.5 }}>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)', mb: 2 }} />

        <Box
          component="img"
          alt="Illustrasi Mahasiswa"
          src="/assetsmatana/asset2-removebg-preview.png"
          sx={{ width: 130, height: 'auto', mx: 'auto', mb: 1.5, display: 'block', opacity: 0.85 }}
        />

        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="caption"
            sx={{ color: 'rgba(255,255,255,0.5)', display: 'block', fontSize: 10, letterSpacing: 0.5, fontWeight: 500 }}
          >
            SISTEM INFORMASI AKADEMIK
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: 'rgba(255,255,255,0.35)', display: 'block', fontSize: 10, mt: 0.25 }}
          >
            v2.1.0
          </Typography>
        </Box>
      </Box>
    </>
  );
}
