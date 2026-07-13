import type { AcademicPeriod, AcademicPeriodFormData } from 'src/lib/types';

import apiClient from './client';

export const academicPeriodApi = {
  fetchAll: (params?: Record<string, string>) =>
    apiClient.get<AcademicPeriod[]>('/periode-akademik/', { params }).then((res) =>
      res.data.map((item) => ({ ...item, id: String(item.id) }))
    ),

  fetchById: (id: string | number) =>
    apiClient.get<AcademicPeriod>(`/periode-akademik/${id}/`).then((res) => ({
      ...res.data,
      id: String(res.data.id),
    })),

  create: (data: AcademicPeriodFormData) =>
    apiClient.post<AcademicPeriod>('/periode-akademik/', data).then((res) => ({
      ...res.data,
      id: String(res.data.id),
    })),

  update: (id: string | number, data: Partial<AcademicPeriodFormData>) =>
    apiClient.put<AcademicPeriod>(`/periode-akademik/${id}/`, data).then((res) => ({
      ...res.data,
      id: String(res.data.id),
    })),

  remove: (id: string | number) =>
    apiClient.delete(`/periode-akademik/${id}/`).then((res) => res.status === 204),
};
