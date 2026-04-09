'use client';

import Link from 'next/link';
import { EmptyState } from '@/components/common/empty-state';
import { LoadingState } from '@/components/common/loading-state';
import { DataTable } from '@/components/common/data-table';
import { useMyOrdersQuery } from '@/features/orders/hooks';

export default function OrdersPage() {
  const ordersQuery = useMyOrdersQuery();

  if (ordersQuery.isLoading) return <LoadingState label="Loading orders" />;
  if (ordersQuery.isError) return <EmptyState title="Orders unavailable" description="Unable to load your orders right now." actionLabel="Browse products" actionHref="/products" />;
  if (!ordersQuery.data || ordersQuery.data.length === 0) return <EmptyState title="No orders yet" description="Your order history will appear here." actionLabel="Browse products" actionHref="/products" />;

  return (
    <DataTable
      data={ordersQuery.data}
      columns={[
        { header: 'Order', cell: (order) => order.orderNumber ?? order.id },
        { header: 'Status', cell: (order) => order.status },
        { header: 'Payment', cell: (order) => order.paymentMethod ?? '-' },
        { header: 'Total', cell: (order) => `$${order.total.toFixed(2)}` },
        { header: 'Action', cell: (order) => <div className="flex gap-3"><Link className="text-brand-700" href={`/orders/${order.id}`}>View</Link><Link className="text-brand-700" href={`/orders/${order.id}/payment`}>Payment</Link></div> },
      ]}
    />
  );
}
