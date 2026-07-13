import type { RouteObject } from 'react-router';

import { lazy, Suspense } from 'react';
import { varAlpha } from 'minimal-shared/utils';
import { Outlet, Navigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { AuthGuard } from 'src/routes/components';

import { DashboardLayout } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

export const SignInPage = lazy(() => import('src/pages/sign-in'));
export const DashboardPage = lazy(() => import('src/pages/dashboard'));
export const AcademicPeriodPage = lazy(() => import('src/pages/academic-period'));
export const ReportingPage = lazy(() => import('src/pages/reporting'));
export const SettingsPage = lazy(() => import('src/pages/settings'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

const renderFallback = () => (
  <Box
    sx={{
      display: 'flex',
      flex: '1 1 auto',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

export const routesSection: RouteObject[] = [
  {
    path: 'sign-in',
    element: <SignInPage />,
  },
  {
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={renderFallback()}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'academic-period', element: <AcademicPeriodPage /> },
      { path: 'reporting', element: <ReportingPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
  {
    path: '404',
    element: <Page404 />,
  },
  { path: '*', element: <Navigate to="/404" replace /> },
];
