import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/features/dashboard/hooks', () => ({
  useDashboardQuery: () => ({
    data: {
      summary: { totalSales: 1000, totalOrders: 25, totalCustomers: 10, totalProducts: 50, from: '2026-03-01', to: '2026-04-10' },
      salesByDay: [
        { date: '2026-04-08', amount: 350 },
        { date: '2026-04-09', amount: 400 },
        { date: '2026-04-10', amount: 250 },
      ],
      topProducts: [
        { productId: '1', name: 'Product A', sold: 15 },
        { productId: '2', name: 'Product B', sold: 10 },
      ],
    },
    isLoading: false,
    isError: false,
    refetch: vi.fn(),
  }),
}));

vi.mock('@/features/admin/hooks', () => ({
  useAdminDashboardQuery: () => ({
    data: {
      summary: { totalSales: 1000, totalOrders: 25, totalCustomers: 10, totalProducts: 50, from: '2026-03-01', to: '2026-04-10' },
      salesByDay: [
        { date: '2026-04-08', amount: 350 },
        { date: '2026-04-09', amount: 400 },
        { date: '2026-04-10', amount: 250 },
      ],
      topProducts: [
        { productId: '1', name: 'Product A', sold: 15 },
        { productId: '2', name: 'Product B', sold: 10 },
      ],
    },
    isLoading: false,
    isError: false,
    refetch: vi.fn(),
  }),
}));

import AdminDashboardPage from './page';

describe('AdminDashboardPage', () => {
  it('renders dashboard title and metrics', () => {
    render(<AdminDashboardPage />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Total Sales')).toBeInTheDocument();
    expect(screen.getByText('Total Orders')).toBeInTheDocument();
    expect(screen.getByText('Total Customers')).toBeInTheDocument();
    expect(screen.getByText('Total Products')).toBeInTheDocument();
  });

  it('renders dashboard data and sections', () => {
    render(<AdminDashboardPage />);
    expect(screen.getByText('Sales by day')).toBeInTheDocument();
    expect(screen.getByText('Top products')).toBeInTheDocument();
    expect(screen.getByText('Product A')).toBeInTheDocument();
    expect(screen.getByText('Product B')).toBeInTheDocument();
  });

  it('renders action buttons', () => {
    render(<AdminDashboardPage />);
    expect(screen.getByText('Export Report')).toBeInTheDocument();
    expect(screen.getByText('Refresh')).toBeInTheDocument();
  });
});
