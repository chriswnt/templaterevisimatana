export type ReportPreset = 'all' | 'active' | 'exam';

export interface FilterState {
  preset: ReportPreset;
  statusFilter: string;
}

export interface ChartSeries {
  name: string;
  data: number[];
}
