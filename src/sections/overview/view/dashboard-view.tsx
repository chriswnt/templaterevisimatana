import { useMemo } from 'react';

import Grid from '@mui/material/Grid';

import { DashboardContent } from 'src/layouts/dashboard';

import { PageHeroBanner } from 'src/components/page-hero-banner';

import { useAcademicPeriods } from 'src/sections/academic-period/hooks';

import { OverviewSummaryCards } from '../components/overview-summary-cards';
import { OverviewQuickActions } from '../components/overview-quick-actions';
import { OverviewRecentPeriods } from '../components/overview-recent-periods';

export function DashboardView() {
  const { data, isLoading } = useAcademicPeriods();

  const summary = useMemo(() => ({
    totalPeriods: data.length,
    activePeriods: data.filter((d) => d.status_aktif).length,
    inactivePeriods: data.length - data.filter((d) => d.status_aktif).length,
    lockedPeriods: data.filter((d) => d.is_locked).length,
  }), [data]);

  return (
    <DashboardContent maxWidth="xl">
      <PageHeroBanner
        title="Dashboard Sistem Akademik"
        description="Pantau dan kelola seluruh periode akademik Universitas Matana dalam satu tampilan terpadu."
        badge="Sistem Admin Akademik"
        infoBadge={`${data.length} total periode akademik`}
        image="/assetsmatana/professional-team-man-woman-business.jpg"
      />

      <OverviewSummaryCards summary={summary} loading={isLoading} />

      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <OverviewQuickActions />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <OverviewRecentPeriods periods={data} loading={isLoading} />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
