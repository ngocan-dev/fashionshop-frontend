import { api, apiRequest } from '@/lib/api/http';
import type { ApiResponse } from '@/lib/api/types';
import type { DashboardPayload } from '@/types/dashboard';

export async function fetchDashboard(from: string, to: string) {
  const response = await api.get<ApiResponse<DashboardPayload>>('/api/dashboard', { params: { from, to } });
  return apiRequest(Promise.resolve(response));
}
