import type { AcademicPeriod, AcademicPeriodFormData } from 'src/lib/types';

import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';

import { Iconify } from 'src/components/iconify';
import { NotificationBanner } from 'src/components/notification-banner';

type AcademicPeriodFormProps = {
  initialData?: AcademicPeriod | null;
  onSubmit: (data: AcademicPeriodFormData) => void;
  onCancel: () => void;
  isLoading: boolean;
  isLocked: boolean;
  readOnly?: boolean;
};

const defaultFormData: AcademicPeriodFormData = {
  kode_periode: '',
  tahun_ajaran: '',
  semester: 'Ganjil',
  nama_periode: '',
  nama_singkat: '',
  tanggal_awal_kuliah: '',
  tanggal_akhir_kuliah: '',
  tanggal_awal_uts: '',
  tanggal_akhir_uts: '',
  tanggal_awal_uas: '',
  tanggal_akhir_uas: '',
  total_prodi_terisi: 0,
  status_aktif: true,
  is_locked: false,
};

export function AcademicPeriodForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
  isLocked,
  readOnly,
}: AcademicPeriodFormProps) {
  const [form, setForm] = useState<AcademicPeriodFormData>(defaultFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isEdit = !!initialData;

  useEffect(() => {
    if (initialData) {
      setForm({
        kode_periode: initialData.kode_periode,
        tahun_ajaran: initialData.tahun_ajaran,
        semester: initialData.semester,
        nama_periode: initialData.nama_periode,
        nama_singkat: initialData.nama_singkat || '',
        tanggal_awal_kuliah: initialData.tanggal_awal_kuliah,
        tanggal_akhir_kuliah: initialData.tanggal_akhir_kuliah,
        tanggal_awal_uts: initialData.tanggal_awal_uts || '',
        tanggal_akhir_uts: initialData.tanggal_akhir_uts || '',
        tanggal_awal_uas: initialData.tanggal_awal_uas || '',
        tanggal_akhir_uas: initialData.tanggal_akhir_uas || '',
        total_prodi_terisi: initialData.total_prodi_terisi,
        status_aktif: initialData.status_aktif,
        is_locked: initialData.is_locked,
      });
    }
  }, [initialData]);

  const handleChange = (field: keyof AcademicPeriodFormData, value: string | boolean | number) => {
    if (readOnly) return;
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!form.kode_periode) newErrors.kode_periode = 'Kode periode wajib diisi';
    if (!form.nama_periode) newErrors.nama_periode = 'Nama periode wajib diisi';
    if (!form.tahun_ajaran) newErrors.tahun_ajaran = 'Tahun ajaran wajib diisi';
    if (!form.tanggal_awal_kuliah) newErrors.tanggal_awal_kuliah = 'Tanggal awal kuliah wajib diisi';
    if (!form.tanggal_akhir_kuliah) newErrors.tanggal_akhir_kuliah = 'Tanggal akhir kuliah wajib diisi';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit(form);
    }
  };

  if (isLocked) {
    return (
      <NotificationBanner
        type="warning"
        message="Periode ini terkunci dan tidak dapat diedit."
      />
    );
  }

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 3 }}>
        {isEdit ? 'Edit Periode Akademik' : 'Tambah Periode Akademik Baru'}
      </Typography>

      {Object.keys(errors).length > 0 && (
        <NotificationBanner
          type="error"
          message="Harap periksa kembali data yang wajib diisi."
          sx={{ mb: 2 }}
        />
      )}

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Kode Periode"
            value={form.kode_periode}
            onChange={(e) => handleChange('kode_periode', e.target.value)}
            error={!!errors.kode_periode}
            helperText={errors.kode_periode}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Nama Singkat"
            value={form.nama_singkat}
            onChange={(e) => handleChange('nama_singkat', e.target.value)}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Nama Periode"
            value={form.nama_periode}
            onChange={(e) => handleChange('nama_periode', e.target.value)}
            error={!!errors.nama_periode}
            helperText={errors.nama_periode}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Tahun Ajaran"
            placeholder="2025/2026"
            value={form.tahun_ajaran}
            onChange={(e) => handleChange('tahun_ajaran', e.target.value)}
            error={!!errors.tahun_ajaran}
            helperText={errors.tahun_ajaran}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            select
            fullWidth
            label="Semester"
            value={form.semester}
            onChange={(e) => handleChange('semester', e.target.value)}
          >
            <MenuItem value="Ganjil">Ganjil</MenuItem>
            <MenuItem value="Genap">Genap</MenuItem>
            <MenuItem value="Pendek">Pendek</MenuItem>
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            type="date"
            label="Tanggal Awal Kuliah"
            value={form.tanggal_awal_kuliah}
            onChange={(e) => handleChange('tanggal_awal_kuliah', e.target.value)}
            error={!!errors.tanggal_awal_kuliah}
            helperText={errors.tanggal_awal_kuliah}
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            type="date"
            label="Tanggal Akhir Kuliah"
            value={form.tanggal_akhir_kuliah}
            onChange={(e) => handleChange('tanggal_akhir_kuliah', e.target.value)}
            error={!!errors.tanggal_akhir_kuliah}
            helperText={errors.tanggal_akhir_kuliah}
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            type="date"
            label="Tanggal Awal UTS"
            value={form.tanggal_awal_uts}
            onChange={(e) => handleChange('tanggal_awal_uts', e.target.value)}
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            type="date"
            label="Tanggal Akhir UTS"
            value={form.tanggal_akhir_uts}
            onChange={(e) => handleChange('tanggal_akhir_uts', e.target.value)}
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            type="date"
            label="Tanggal Awal UAS"
            value={form.tanggal_awal_uas}
            onChange={(e) => handleChange('tanggal_awal_uas', e.target.value)}
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            type="date"
            label="Tanggal Akhir UAS"
            value={form.tanggal_akhir_uas}
            onChange={(e) => handleChange('tanggal_akhir_uas', e.target.value)}
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            type="number"
            label="Total Prodi Terisi"
            value={form.total_prodi_terisi}
            onChange={(e) => handleChange('total_prodi_terisi', Number(e.target.value))}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControlLabel
            control={
              <Switch
                checked={form.status_aktif}
                onChange={(e) => handleChange('status_aktif', e.target.checked)}
              />
            }
            label="Status Aktif"
          />
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
        {readOnly ? (
          <Button variant="outlined" onClick={onCancel}>
            Kembali
          </Button>
        ) : (
          <>
            <Button variant="outlined" onClick={onCancel}>
              Batal
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={isLoading}
              startIcon={
                isLoading ? (
                  <Iconify icon="solar:spinner-bold-duotone" width={18} />
                ) : (
                  <Iconify icon="solar:diskette-bold-duotone" width={18} />
                )
              }
            >
              {isEdit ? 'Simpan Perubahan' : 'Buat Periode'}
            </Button>
          </>
        )}
      </Box>
    </Card>
  );
}
