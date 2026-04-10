import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/features/dashboard/hooks', () => ({
  useDashboardQuery: () => ({
    data: {
      summary: { totalSales: 100, totalOrders: 4, totalCustomers: 2, totalProducts: 8, from: '2026-03-01', to: '2026-04-01' },
      salesByDay: [],
      topProducts: [],
    },
    isLoading: false,
  }),
}));

import AdminDashboardPage from './page';

describe('AdminDashboardPage', () => {
  it('renders dashboard metrics', () => {
    render(<AdminDashboardPage />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });
});
