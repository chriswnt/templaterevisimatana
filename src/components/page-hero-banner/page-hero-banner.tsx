import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';

import type { PageHeroBannerProps } from './types';

export function PageHeroBanner({ title, description, badge, infoBadge, image, sx }: PageHeroBannerProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: 3,
        overflow: 'hidden',
        mb: 4,
        background: 'linear-gradient(135deg, #0A2E5A 0%, #0F4C81 35%, #1E6EB5 65%, #2563EB 100%)',
        boxShadow: '0 8px 32px rgba(37, 99, 235, 0.25)',
        minHeight: { xs: 200, md: 200 },
        ...sx,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        <Box
          component="img"
          alt=""
          src="/assetsmatana/matana-logo-removebg-preview.png"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: 350, md: 500 },
            height: 'auto',
            opacity: 0.025,
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            top: -80,
            right: '15%',
            width: 250,
            height: 250,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -60,
            left: '8%',
            width: 180,
            height: 180,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '20%',
            left: '30%',
            width: 100,
            height: 100,
            borderRadius: '28px',
            transform: 'rotate(45deg)',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.04)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '25%',
            right: '40%',
            width: 60,
            height: 60,
            borderRadius: '16px',
            transform: 'rotate(30deg)',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.04)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '15%',
            right: '25%',
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.03)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '10%',
            left: '45%',
            width: 24,
            height: 24,
            borderRadius: '6px',
            transform: 'rotate(60deg)',
            background: 'rgba(255,255,255,0.04)',
          }}
        />
      </Box>

      {image && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: { xs: '38%', lg: '30%' },
            height: '100%',
            display: { xs: 'none', md: 'block' },
            zIndex: 1,
          }}
        >
          <Box
            component="img"
            src={image}
            alt=""
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              maskImage: 'linear-gradient(90deg, transparent 0%, #000 35%)',
              WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, #000 35%)',
            }}
          />
        </Box>
      )}

      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          py: { xs: 3, md: 4 },
          px: { xs: 3, md: 5 },
          display: 'flex',
          flexDirection: 'column',
          gap: 0.5,
        }}
      >
        {badge && (
          <Chip
            label={badge}
            size="small"
            sx={{
              alignSelf: 'flex-start',
              mb: 1,
              color: 'common.white',
              fontWeight: 600,
              fontSize: 12,
              height: 26,
              bgcolor: 'rgba(255,255,255,0.12)',
              backdropFilter: 'blur(8px)',
              '& .MuiChip-label': { px: 1.5 },
            }}
          />
        )}

        <Typography
          variant="h3"
          sx={{ color: 'common.white', fontWeight: 700, lineHeight: 1.2, fontSize: { xs: 22, md: 30 } }}
        >
          {title}
        </Typography>

        <Typography
          variant="body1"
          sx={{ color: 'rgba(255,255,255,0.75)', mt: 0.25, maxWidth: 540, lineHeight: 1.5, fontSize: 14 }}
        >
          {description}
        </Typography>

        {infoBadge && (
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.5,
              mt: 0.75,
              color: 'rgba(255,255,255,0.6)',
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            <Iconify icon="solar:info-circle-bold-duotone" width={16} sx={{ color: 'rgba(255,255,255,0.5)' }} />
            {infoBadge}
          </Box>
        )}
      </Box>
    </Box>
  );
}
