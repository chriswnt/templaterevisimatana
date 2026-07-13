import type { AcademicPeriod, AcademicPeriodFormData } from 'src/lib/types';

import { useState, useEffect, useCallback } from 'react';

import { academicPeriodApi } from 'src/services/api';

export function useAcademicPeriods() {
  const [data, setData] = useState<AcademicPeriod[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await academicPeriodApi.fetchAll();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal mengambil data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const create = useCallback(async (formData: AcademicPeriodFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const newItem = await academicPeriodApi.create(formData);
      setData((prev) => [newItem, ...prev]);
      return newItem;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal membuat data');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const update = useCallback(async (id: string, formData: Partial<AcademicPeriodFormData>) => {
    setIsLoading(true);
    setError(null);
    try {
      const updated = await academicPeriodApi.update(id, formData);
      setData((prev) => prev.map((item) => (item.id === id ? updated : item)));
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal mengubah data');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const remove = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await academicPeriodApi.remove(id);
      setData((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal menghapus data');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, isLoading, error, fetchAll, create, update, remove };
}
