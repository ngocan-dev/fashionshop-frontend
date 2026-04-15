import { api, apiRequest } from '@/lib/api/http';
import type { ApiResponse } from '@/lib/api/types';
import type { DashboardPayload } from '@/types/dashboard';

const USE_MOCK = true;

function createMockDashboardData(from: string, to: string): DashboardPayload {
  return {
    summary: {
      totalSales: 128450,
      totalOrders: 452,
      totalProducts: 85,
      totalCustomers: 1284,
      from,
      to,
    },
    salesByDay: Array.from({ length: 30 }).map((_, i) => ({
      date: `2026-03-${String(i + 1).padStart(2, '0')}`,
      amount: Math.floor(Math.random() * 5000) + 1000,
    })),
    topProducts: [
      { productId: 'prod_001', name: 'Sculpted Blazer', sold: 45 },
      { productId: 'prod_002', name: 'Kinetic Pleat Trousers', sold: 38 },
      { productId: 'prod_003', name: 'Cotton Poplin Shirt', sold: 32 },
      { productId: 'prod_004', name: 'Leather Tote', sold: 28 },
      { productId: 'prod_005', name: 'Wool Overcoat', sold: 24 },
    ],
  };
}

export async function fetchDashboard(from: string, to: string) {
  if (USE_MOCK) return createMockDashboardData(from, to);
  const response = await api.get<ApiResponse<DashboardPayload>>('/api/dashboard', { params: { from, to } });
  return apiRequest(Promise.resolve(response));
}
