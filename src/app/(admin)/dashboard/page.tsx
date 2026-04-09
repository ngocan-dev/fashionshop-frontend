'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { LoadingState } from '@/components/common/loading-state';
import { EmptyState } from '@/components/common/empty-state';
import { useDashboardQuery } from '@/features/dashboard/hooks';
import { DashboardView } from '@/features/dashboard/components/dashboard-view';

function currentDate(offsetDays = 0) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().slice(0, 10);
}

export default function AdminDashboardPage() {
  const [from, setFrom] = useState(currentDate(-30));
  const [to, setTo] = useState(currentDate());
  const query = useDashboardQuery(from, to);

  if (query.isLoading) return <LoadingState label="Loading dashboard" />;
  if (query.isError) return <EmptyState title="Dashboard unavailable" description="Unable to load dashboard metrics." />;
  if (!query.data) return <EmptyState title="Dashboard unavailable" />;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><h1 className="text-2xl font-semibold">Dashboard</h1></CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:max-w-xl">
          <label className="space-y-2"><span className="text-sm font-medium">From</span><Input type="date" value={from} onChange={(event) => setFrom(event.target.value)} /></label>
          <label className="space-y-2"><span className="text-sm font-medium">To</span><Input type="date" value={to} onChange={(event) => setTo(event.target.value)} /></label>
        </CardContent>
      </Card>
      <DashboardView data={query.data} />
    </div>
  );
}
