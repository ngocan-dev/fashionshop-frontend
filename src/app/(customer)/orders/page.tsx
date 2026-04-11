'use client';

import Link from 'next/link';
import { EmptyState } from '@/components/common/empty-state';
import { LoadingState } from '@/components/common/loading-state';
import { useMyOrdersQuery } from '@/features/orders/hooks';
import { useState } from 'react';

type FilterStatus = 'all' | 'pending' | 'shipped' | 'delivered';

export default function OrdersPage() {
  const ordersQuery = useMyOrdersQuery();
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const hasBackendError = ordersQuery.isError;

  // Show loading state
  if (ordersQuery.isPending) {
    return <LoadingState />;
  }

  if (!hasBackendError && (!ordersQuery.data || ordersQuery.data.length === 0)) {
    return (
      <EmptyState
        title="No orders yet"
        description="Your order history will appear here."
        actionLabel="Browse products"
        actionHref="/products"
      />
    );
  }

  const orders = ordersQuery.data ?? [];

  // Filter orders based on status
  const filteredOrders = orders.filter((order) => {
    if (filterStatus === 'all') return true;
    return order.status.toLowerCase() === filterStatus;
  });

  // Status badge styling
  const getStatusBadgeClass = () => 'bg-[#e8e8e8] text-[#1a1c1c]';

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-10 font-body text-[#1a1c1c] md:px-12 lg:px-24 lg:py-14">
      <section className="mb-16">
        <h1 className="font-headline mb-4 text-5xl font-black tracking-[-0.06em] md:text-7xl">Orders.</h1>
        <p className="max-w-lg font-medium tracking-tight text-[#5e5e5e]">
          Track your acquisitions and curated selections. Manage your recent deliveries and upcoming shipments.
        </p>
        {hasBackendError && (
          <div className="mt-4 rounded-lg bg-[#f3f3f4] p-4 text-sm text-[#7a7a7a]">
            Unable to load orders data. Showing layout while content is unavailable.
          </div>
        )}
      </section>

      <nav className="mb-12 flex flex-wrap gap-4">
        {(['all', 'pending', 'shipped', 'delivered'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`rounded-md px-6 py-2 text-sm font-bold uppercase tracking-[0.24em] transition-all duration-200 ${filterStatus === status ? 'bg-black text-white hover:scale-105' : 'bg-[#e2e2e2] text-[#1a1c1c] hover:opacity-70'}`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </nav>

      <div className="grid grid-cols-1 gap-8 pb-24 md:grid-cols-2">
        {hasBackendError &&
          [...Array(4)].map((_, i) => (
            <div key={`skeleton-${i}`} className="space-y-4 rounded-lg bg-[#f3f3f4] p-6">
              <div className="h-4 w-32 rounded bg-[#e8e8e8]"></div>
              <div className="flex gap-2">
                {[...Array(3)].map((__, j) => (
                  <div key={j} className="h-16 w-16 rounded bg-[#e8e8e8]"></div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2 pt-2">
                {[...Array(3)].map((__, j) => (
                  <div key={j} className="space-y-1">
                    <div className="h-3 w-12 rounded bg-[#e8e8e8]"></div>
                    <div className="h-4 w-16 rounded bg-[#e8e8e8]"></div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 pt-2">
                <div className="flex-1 h-9 rounded bg-[#1a1c1c]"></div>
                <div className="flex-1 h-9 rounded border border-[#e8e8e8]"></div>
              </div>
            </div>
          ))}
        {!hasBackendError && filteredOrders.map((order) => (
          <article
            key={order.id}
            className="flex flex-col justify-between rounded-xl bg-white p-8 transition-transform duration-200 hover:scale-[1.01]"
          >
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-start">
                <div>
                  <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.3em] text-[#777777]">
                    Order Reference
                  </span>
                  <h3 className="font-headline text-xl font-bold tracking-tight">#{order.orderNumber || order.id}</h3>
                </div>
                <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] ${getStatusBadgeClass()}`}>
                  {order.status}
                </span>
              </div>

              {order.items && order.items.length > 0 && (
                <div className="flex items-center gap-4">
                  {order.items.slice(0, 2).map((item, idx) => (
                    <div
                      key={idx}
                      className="h-20 w-16 flex-shrink-0 overflow-hidden rounded bg-[#f3f3f4]"
                    >
                      <div className="flex h-full w-full items-center justify-center p-2 text-center text-[10px] font-bold uppercase tracking-[0.18em] text-[#5e5e5e]">
                        {item.name}
                      </div>
                    </div>
                  ))}
                  {order.items.length > 2 && (
                    <div className="relative h-20 w-16 overflow-hidden rounded bg-[#f3f3f4]">
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-xs font-bold text-white">
                        +{order.items.length - 2}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-[#777777]">Date</span>
                  <p className="text-sm font-semibold tracking-tight">
                    {new Date(order.createdAt || new Date()).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-[#777777]">Items</span>
                  <p className="text-sm font-semibold tracking-tight">{order.items?.length ?? 0} piece{order.items?.length !== 1 ? 's' : ''}</p>
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-[#777777]">Total</span>
                  <p className="text-sm font-semibold tracking-tight">${order.total.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <button type="button" className="flex-1 rounded-md bg-black py-3 text-[10px] font-black uppercase tracking-[0.24em] text-white transition-opacity hover:opacity-90">
                Track Shipment
              </button>
              <Link href={`/orders/${order.id}`} className="flex-1 rounded-md bg-[#f3f3f4] py-3 text-center text-[10px] font-black uppercase tracking-[0.24em] text-[#1a1c1c] transition-colors hover:bg-[#e8e8e8]">
                View Details
              </Link>
            </div>
          </article>
        ))}
      </div>

      {!hasBackendError && filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <p className="mb-4 text-[#5e5e5e]">No {filterStatus !== 'all' ? filterStatus : ''} orders found.</p>
          <button
            onClick={() => setFilterStatus('all')}
            className="border-b-2 border-black pb-2 text-sm font-bold uppercase tracking-[0.24em] transition-opacity hover:opacity-50"
          >
            View All Orders
          </button>
        </div>
      )}

      {hasBackendError && (
        <div className="mb-8 text-center">
          <Link
            href="/products"
            className="rounded-md bg-black px-8 py-3 text-sm font-bold uppercase tracking-[0.24em] !text-white no-underline transition-all hover:bg-[#474747] hover:!text-white focus-visible:!text-white"
            style={{ color: '#ffffff' }}
          >
            Browse Items
          </Link>
        </div>
      )}

      {!hasBackendError && filteredOrders.length > 0 && (
        <div className="mt-20 text-center">
          <button type="button" className="border-b-2 border-black pb-2 text-sm font-bold uppercase tracking-[0.24em] transition-opacity hover:opacity-50">
            Load Older Orders
          </button>
        </div>
      )}
    </main>
  );
}
