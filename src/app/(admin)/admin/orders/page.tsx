'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useManageOrdersQuery } from '@/features/orders/hooks';
import { useDebounce } from '@/hooks/use-debounce';
import { cn } from '@/lib/utils/cn';
import type { OrderStatus } from '@/types/order';

// ── Status Badge Config ──────────────────────────────────────────────────────

const PAYMENT_STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  PAID:     { label: 'Paid',    className: 'bg-emerald-50 text-emerald-700' },
  PENDING:  { label: 'Pending', className: 'bg-neutral-100 text-neutral-600' },
  FAILED:   { label: 'Failed',  className: 'bg-red-50 text-red-700' },
  REFUNDED: { label: 'Refunded', className: 'bg-amber-50 text-amber-700' },
};

const FULFILLMENT_STATUS_CONFIG: Record<OrderStatus, { label: string; className: string; strikethrough?: boolean }> = {
  PENDING:    { label: 'Unfulfilled', className: 'bg-neutral-100 text-neutral-600' },
  CONFIRMED:  { label: 'Confirmed',   className: 'bg-blue-50 text-blue-700' },
  PROCESSING: { label: 'Processing',  className: 'bg-amber-50 text-amber-700' },
  SHIPPED:    { label: 'Shipped',     className: 'bg-blue-50 text-blue-700' },
  DELIVERED:  { label: 'Delivered',   className: 'bg-emerald-50 text-emerald-700' },
  CANCELLED:  { label: 'Cancelled',   className: 'bg-neutral-100 text-neutral-400', strikethrough: true },
};

// ── Status Filter Tabs ──────────────────────────────────────────────────────

const STATUS_TABS: { label: string; value: OrderStatus | '' }[] = [
  { label: 'All Orders',  value: '' },
  { label: 'Pending',     value: 'PENDING' },
  { label: 'Confirmed',   value: 'CONFIRMED' },
  { label: 'Processing',  value: 'PROCESSING' },
  { label: 'Shipped',     value: 'SHIPPED' },
  { label: 'Delivered',   value: 'DELIVERED' },
  { label: 'Cancelled',   value: 'CANCELLED' },
];

// ── Component ────────────────────────────────────────────────────────────────

export default function AdminOrdersPage() {
  const [searchTerm, setSearchTerm]     = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | ''>('');
  const [page, setPage]                 = useState(1);
  const [pageSize]                      = useState(10);

  const debouncedSearch = useDebounce(searchTerm, 500);

  // Reset to page 1 when filter/search changes
  const handleStatusChange = (status: OrderStatus | '') => {
    setStatusFilter(status);
    setPage(1);
  };
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setPage(1);
  };

  const { data: response, isLoading } = useManageOrdersQuery({
    keyword: debouncedSearch || undefined,
    status:  statusFilter   || undefined,
    page:    page - 1, // 0-indexed
    size:    pageSize,
  });

  const orders     = response?.data?.items ?? [];
  const totalItems = response?.data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="max-w-7xl mx-auto">

      {/* ── Page Header ──────────────────────────────────────────────────── */}
      <div className="flex justify-between items-end mb-12">
        <div>
          <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-4">
            <span>Admin</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-primary font-bold">Orders</span>
          </nav>
          <h2 className="text-4xl font-headline font-extrabold tracking-tighter uppercase">Order Management</h2>
          <p className="text-neutral-500 mt-2 font-body text-sm">
            {isLoading
              ? 'Loading orders...'
              : `Reviewing ${totalItems.toLocaleString()} total transactions.`}
          </p>
        </div>
      </div>

      {/* ── Status Filter Bar ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-12 gap-6 mb-8">
        <div className="col-span-12 lg:col-span-8 flex gap-2 overflow-x-auto pb-2">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => handleStatusChange(tab.value)}
              className={cn(
                'px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase whitespace-nowrap transition-all',
                statusFilter === tab.value
                  ? 'bg-primary text-white'
                  : 'bg-surface-container-highest text-on-surface-variant hover:bg-surface-container-high'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="col-span-12 lg:col-span-4 flex items-center gap-3">
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 text-sm">search</span>
            <input
              className="w-full bg-surface-container-lowest border border-outline/10 rounded-md py-2 pl-10 pr-4 text-xs font-label focus:ring-1 focus:ring-primary transition-all placeholder:text-neutral-400"
              placeholder="Search order ID or customer..."
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* ── Orders Table ──────────────────────────────────────────────────── */}
      <div className="bg-surface-container-lowest rounded-xl overflow-hidden border border-neutral-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-neutral-100">
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-neutral-500">Order ID</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-neutral-500">Customer</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-neutral-500">Date</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-neutral-500">Total</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-neutral-500">Payment</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-neutral-500">Fulfillment</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-neutral-500 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50">
              {isLoading ? (
                // Loading skeleton rows
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-8 py-6"><div className="h-4 w-16 bg-neutral-100 rounded" /></td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-neutral-100" />
                        <div className="space-y-1">
                          <div className="h-3 w-24 bg-neutral-100 rounded" />
                          <div className="h-2.5 w-32 bg-neutral-100 rounded" />
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6"><div className="h-4 w-24 bg-neutral-100 rounded" /></td>
                    <td className="px-8 py-6"><div className="h-4 w-16 bg-neutral-100 rounded" /></td>
                    <td className="px-8 py-6"><div className="h-6 w-14 bg-neutral-100 rounded-md" /></td>
                    <td className="px-8 py-6"><div className="h-6 w-20 bg-neutral-100 rounded-md" /></td>
                    <td className="px-8 py-6 text-right"><div className="h-4 w-20 bg-neutral-100 rounded ml-auto" /></td>
                  </tr>
                ))
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-8 py-20 text-center">
                    <span className="material-symbols-outlined text-4xl text-neutral-300 block mb-3">shopping_bag</span>
                    <p className="text-sm font-semibold text-neutral-500">No orders found</p>
                    <p className="text-xs text-neutral-400 mt-1">Try adjusting your search or filters</p>
                  </td>
                </tr>
              ) : (
                orders.map((order) => {
                  const paymentKey  = order.paymentStatus ?? 'PENDING';
                  const payment     = PAYMENT_STATUS_CONFIG[paymentKey] ?? PAYMENT_STATUS_CONFIG.PENDING;
                  const fulfillment = FULFILLMENT_STATUS_CONFIG[order.status];

                  // Customer display — API doesn't return name/email, fall back to order info
                  const displayName    = order.customerName ?? `Order ${order.orderNumber ?? order.id.slice(-6).toUpperCase()}`;
                  const displayEmail   = order.customerEmail ?? order.paymentMethod ?? '—';
                  const initials       = order.customerName
                    ? order.customerName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
                    : (order.orderNumber ?? order.id).slice(-2).toUpperCase();

                  const formattedDate = order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                    : '—';

                  return (
                    <tr key={order.id} className="hover:bg-surface-container-low/50 transition-colors group">
                      {/* Order ID */}
                      <td className="px-8 py-6 font-bold text-sm">
                        #{order.orderNumber ?? order.id.slice(-6).toUpperCase()}
                      </td>

                      {/* Customer */}
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                            {initials}
                          </div>
                          <div className="overflow-hidden">
                            <p className="text-sm font-bold truncate">{displayName}</p>
                            <p className="text-[10px] text-neutral-400 truncate">{displayEmail}</p>
                          </div>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="px-8 py-6 text-sm text-neutral-600 whitespace-nowrap">{formattedDate}</td>

                      {/* Total */}
                      <td className="px-8 py-6 font-bold text-sm whitespace-nowrap">
                        ${order.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>

                      {/* Payment Status */}
                      <td className="px-8 py-6">
                        <span className={cn(
                          'inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider',
                          payment.className
                        )}>
                          {payment.label}
                        </span>
                      </td>

                      {/* Fulfillment Status */}
                      <td className="px-8 py-6">
                        <span className={cn(
                          'inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider',
                          fulfillment.className,
                          fulfillment.strikethrough && 'line-through'
                        )}>
                          {fulfillment.label}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="px-8 py-6 text-right">
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="text-xs font-bold uppercase tracking-widest text-primary hover:underline underline-offset-4 transition-all"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* ── Pagination ────────────────────────────────────────────────── */}
        <div className="px-8 py-6 border-t border-neutral-100 flex justify-between items-center bg-surface-container-low/30">
          <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
            {isLoading
              ? 'Loading...'
              : `Showing ${Math.min((page - 1) * pageSize + 1, totalItems)}–${Math.min(page * pageSize, totalItems)} of ${totalItems.toLocaleString()} orders`
            }
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-8 h-8 flex items-center justify-center rounded border border-outline/10 hover:bg-white disabled:opacity-30 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>

            {/* Page numbers — show at most 5 around current page */}
            {(() => {
              const delta = 2;
              const start = Math.max(1, page - delta);
              const end   = Math.min(totalPages, page + delta);
              const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

              return (
                <>
                  {start > 1 && (
                    <>
                      <button
                        onClick={() => setPage(1)}
                        className="w-8 h-8 flex items-center justify-center rounded border border-outline/10 hover:bg-white text-xs font-bold transition-all"
                      >1</button>
                      {start > 2 && <span className="px-1 self-center text-neutral-400 text-xs">…</span>}
                    </>
                  )}
                  {pages.map((p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={cn(
                        'w-8 h-8 flex items-center justify-center rounded text-xs font-bold transition-all',
                        p === page
                          ? 'bg-primary text-white'
                          : 'border border-outline/10 hover:bg-white'
                      )}
                    >{p}</button>
                  ))}
                  {end < totalPages && (
                    <>
                      {end < totalPages - 1 && <span className="px-1 self-center text-neutral-400 text-xs">…</span>}
                      <button
                        onClick={() => setPage(totalPages)}
                        className="w-8 h-8 flex items-center justify-center rounded border border-outline/10 hover:bg-white text-xs font-bold transition-all"
                      >{totalPages}</button>
                    </>
                  )}
                </>
              );
            })()}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-8 h-8 flex items-center justify-center rounded border border-outline/10 hover:bg-white disabled:opacity-30 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Order Insights ────────────────────────────────────────────────── */}
      <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Pending Orders */}
        <div className="p-8 bg-surface-container-low rounded-xl border border-outline/5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-6">Pending Orders</p>
          <div className="flex items-end gap-4">
            <h3 className="text-3xl font-headline font-extrabold tracking-tighter">
              {orders.filter((o) => o.status === 'PENDING').length}
            </h3>
            <span className="text-amber-600 text-[10px] font-bold mb-1">This page</span>
          </div>
          <div className="mt-8 flex items-end gap-1 h-12">
            {[40, 60, 50, 80, 100].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-primary/10 rounded-t-sm"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        {/* Fulfillment Rate */}
        <div className="p-8 bg-surface-container-low rounded-xl border border-outline/5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-6">Fulfillment Rate</p>
          <div className="flex items-end gap-4">
            {(() => {
              const fulfilled = orders.filter((o) => o.status === 'DELIVERED' || o.status === 'SHIPPED').length;
              const rate = orders.length > 0 ? Math.round((fulfilled / orders.length) * 100) : 0;
              return (
                <>
                  <h3 className="text-3xl font-headline font-extrabold tracking-tighter">{rate}%</h3>
                  <span className="text-emerald-600 text-[10px] font-bold mb-1">Target 95%</span>
                </>
              );
            })()}
          </div>
          <div className="mt-8 w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-primary h-full rounded-full transition-all duration-700"
              style={{
                width: `${orders.length > 0
                  ? Math.round((orders.filter((o) => o.status === 'DELIVERED' || o.status === 'SHIPPED').length / orders.length) * 100)
                  : 0}%`
              }}
            />
          </div>
        </div>

        {/* Priority Queue CTA */}
        <div className="p-8 bg-black text-white rounded-xl shadow-2xl relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-6">Priority Support</p>
            <h3 className="text-xl font-headline font-bold leading-tight mb-4">
              {orders.filter((o) => o.status === 'PENDING').length} Orders Awaiting Action
            </h3>
            <button
              onClick={() => handleStatusChange('PENDING')}
              className="flex items-center gap-2 group-hover:gap-4 transition-all text-xs font-bold uppercase tracking-widest text-white border-b border-white pb-1"
            >
              Go to Pending Queue
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
          <div className="absolute right-[-20%] top-[-20%] w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all" />
        </div>
      </section>
    </div>
  );
}
