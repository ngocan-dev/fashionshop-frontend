'use client';

import Link from 'next/link';
import { EmptyState } from '@/components/common/empty-state';
import { LoadingState } from '@/components/common/loading-state';
import { DataTable } from '@/components/common/data-table';
import { useManageOrdersQuery } from '@/features/orders/hooks';

export default function StaffOrdersPage() {
  const ordersQuery = useManageOrdersQuery();

  if (ordersQuery.isLoading) return <LoadingState label="Loading orders" />;
  if (ordersQuery.isError) return <EmptyState title="Orders unavailable" description="Unable to load orders right now." actionLabel="Retry" actionHref="/staff/orders" />;
  if (!ordersQuery.data || ordersQuery.data.length === 0) return <EmptyState title="No orders" />;

  return <DataTable data={ordersQuery.data} columns={[{ header: 'Order', cell: (order) => order.orderNumber ?? order.id }, { header: 'Status', cell: (order) => order.status }, { header: 'View', cell: (order) => <Link className="text-brand-700" href={`/staff/orders/${order.id}`}>Open</Link> }]} />;
}
