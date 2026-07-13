import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import type { ReportPreset } from '../types';

type ReportingPresetSelectorProps = {
  preset: ReportPreset;
  onChange: (preset: ReportPreset) => void;
};

const PRESET_OPTIONS: { value: ReportPreset; label: string }[] = [
  { value: 'all', label: 'Semua' },
  { value: 'active', label: 'Aktif' },
  { value: 'exam', label: 'UTS/UAS' },
];

export function ReportingPresetSelector({ preset, onChange }: ReportingPresetSelectorProps) {
  return (
    <ToggleButtonGroup
      value={preset}
      exclusive
      onChange={(_, newValue) => {
        if (newValue) onChange(newValue);
      }}
      size="small"
    >
      {PRESET_OPTIONS.map((opt) => (
        <ToggleButton key={opt.value} value={opt.value}>
          {opt.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
