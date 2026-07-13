import type { ReportSummary } from 'src/lib/types';

import Grid from '@mui/material/Grid';

import { SummaryCard } from 'src/components/summary-card';

type OverviewSummaryCardsProps = {
  summary: ReportSummary;
  loading?: boolean;
};

export function OverviewSummaryCards({ summary, loading }: OverviewSummaryCardsProps) {
  if (loading) {
    return (
      <Grid container spacing={4}>
        {[1, 2, 3, 4].map((i) => (
          <Grid key={i} size={{ xs: 12, sm: 6, md: 3 }}>
            <SummaryCard icon="solar:clock-circle-bold-duotone" value="-" label="Memuat..." />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Grid container spacing={4}>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <SummaryCard
          icon="solar:calendar-bold-duotone"
          value={summary.totalPeriods}
          label="Total Periode"
          color="primary"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <SummaryCard
          icon="solar:check-circle-bold-duotone"
          value={summary.activePeriods}
          label="Periode Aktif"
          color="success"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <SummaryCard
          icon="solar:clock-circle-bold-duotone"
          value={summary.inactivePeriods}
          label="Periode Tidak Aktif"
          color="warning"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <SummaryCard
          icon="solar:lock-bold-duotone"
          value={summary.lockedPeriods}
          label="Periode Terkunci"
          color="error"
        />
      </Grid>
    </Grid>
  );
}
