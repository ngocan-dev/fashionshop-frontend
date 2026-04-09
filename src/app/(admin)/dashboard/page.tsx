'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LoadingState } from '@/components/common/loading-state';
import { EmptyState } from '@/components/common/empty-state';
import { useAdminDashboardQuery } from '@/features/admin/hooks';
import { defaultDashboardRangeDays } from '@/features/admin/constants';
import { formatDateInputOffset } from '@/features/admin/utils';
import { DashboardView } from '@/features/dashboard/components/dashboard-view';
import { DashboardStatsCard } from '@/features/dashboard/components/dashboard-stats-card';
import { BarChart3, ShoppingCart, Users, Package } from 'lucide-react';

export default function AdminDashboardPage() {
  const [from, setFrom] = useState(formatDateInputOffset(-defaultDashboardRangeDays));
  const [to, setTo] = useState(formatDateInputOffset());
  const query = useAdminDashboardQuery(from, to);

  if (query.isLoading) return <LoadingState label="Loading dashboard" />;
  if (query.isError) return <EmptyState title="Dashboard unavailable" description="Unable to load dashboard metrics." />;
  if (!query.data) return <EmptyState title="Dashboard unavailable" />;

  const { summary } = query.data;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-2 text-muted-foreground">Monitor your store performance and metrics.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:max-w-2xl lg:grid-cols-2">
        <div>
          <label className="space-y-2">
            <span className="text-sm font-medium">From</span>
            <Input type="date" value={from} onChange={(event) => setFrom(event.target.value)} className="rounded-2xl" />
          </label>
        </div>
        <div>
          <label className="space-y-2">
            <span className="text-sm font-medium">To</span>
            <Input type="date" value={to} onChange={(event) => setTo(event.target.value)} className="rounded-2xl" />
          </label>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardStatsCard label="Total Sales" value={`$${summary.totalSales.toFixed(2)}`} icon={<BarChart3 />} />
        <DashboardStatsCard label="Total Orders" value={summary.totalOrders} icon={<ShoppingCart />} />
        <DashboardStatsCard label="Total Customers" value={summary.totalCustomers} icon={<Users />} />
        <DashboardStatsCard label="Total Products" value={summary.totalProducts} icon={<Package />} />
      </div>

      <div className="flex gap-3">
        <Button variant="outline" className="rounded-2xl">
          Export Report
        </Button>
        <Button variant="outline" className="rounded-2xl" onClick={() => query.refetch()}>
          Refresh
        </Button>
      </div>

      <DashboardView data={query.data} />
    </div>
  );
}
