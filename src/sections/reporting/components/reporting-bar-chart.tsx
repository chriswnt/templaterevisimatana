import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import { Chart, useChart } from 'src/components/chart';

import type { ChartSeries } from '../types';

type ReportingBarChartProps = {
  categories: string[];
  series: ChartSeries[];
  loading?: boolean;
};

export function ReportingBarChart({ categories, series, loading }: ReportingBarChartProps) {
  const chartOptions = useChart({
    chart: { type: 'bar', stacked: true },
    xaxis: { categories },
    colors: ['#1E3A5F', '#10B981', '#F59E0B'],
    plotOptions: {
      bar: { borderRadius: 4, columnWidth: '60%' },
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'right',
    },
  });

  if (loading) {
    return (
      <Card sx={{ p: 3 }}>
        <Typography color="text.secondary">Memuat grafik...</Typography>
      </Card>
    );
  }

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Periode per Tahun Ajaran
      </Typography>

      <Chart
        type="bar"
        series={series}
        options={chartOptions}
        sx={{ height: 360 }}
      />
    </Card>
  );
}
