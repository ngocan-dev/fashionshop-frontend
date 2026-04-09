'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import { EmptyState } from '@/components/common/empty-state';
import { LoadingState } from '@/components/common/loading-state';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useMyOrderQuery } from '@/features/orders/hooks';
import { usePayOrderMutation } from '@/features/payments/hooks';
import { useMyOrderPaymentQuery } from '@/features/orders/hooks';
import { useInvoicesByOrderQuery } from '@/features/invoices/hooks';
import { isOrderPayable } from '@/features/orders/rules';
import type { PayOrderRequest } from '@/types/payment';
import type { ParsedApiError } from '@/lib/api/errors';

export default function OrderPaymentPage() {
  const params = useParams<{ orderId: string }>();
  const orderQuery = useMyOrderQuery(params.orderId);
  const paymentQuery = useMyOrderPaymentQuery(params.orderId);
  const invoiceQuery = useInvoicesByOrderQuery(params.orderId);
  const payMutation = usePayOrderMutation(params.orderId);
  const [paymentMethod, setPaymentMethod] = useState<PayOrderRequest['paymentMethod']>('CARD');
  const [transactionRef, setTransactionRef] = useState('');

  if (orderQuery.isLoading || paymentQuery.isLoading) return <LoadingState label="Loading payment" />;
  if (orderQuery.isError) return <EmptyState title="Payment unavailable" description="Unable to load order payment context." actionLabel="Back to orders" actionHref="/orders" />;
  if (!orderQuery.data) return <EmptyState title="Order not found" actionLabel="Back to orders" actionHref="/orders" />;

  const canPay = isOrderPayable(orderQuery.data, paymentQuery.data ?? null);
  const invoice = invoiceQuery.data ?? null;

  return (
    <Card>
      <CardHeader><h1 className="text-2xl font-semibold">Payment detail</h1></CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div className="rounded-2xl border border-border bg-muted/20 p-4">
          <div>Order: {orderQuery.data.orderNumber ?? orderQuery.data.id}</div>
          <div className="mt-2">Current status: {orderQuery.data.status}</div>
          <div className="mt-2">Method: {paymentQuery.data?.method ?? orderQuery.data.paymentMethod ?? '-'}</div>
          <div className="mt-2">Payment status: {paymentQuery.data?.status ?? 'PENDING'}</div>
          <div className="mt-2">Amount: ${(paymentQuery.data?.amount ?? orderQuery.data.total).toFixed(2)}</div>
        </div>

        {invoice ? (
          <Button asChild variant="outline">
            <Link href={`/invoices/${invoice.id}`}>View invoice</Link>
          </Button>
        ) : null}

        {canPay ? (
          <div className="space-y-3 rounded-2xl border border-border p-4">
            <h2 className="font-medium">Complete payment</h2>
            <label className="block space-y-2">
              <span className="text-sm font-medium">Payment method</span>
              <select className="h-11 w-full rounded-2xl border border-input bg-background px-4" value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value as PayOrderRequest['paymentMethod'])}>
                <option value="CARD">Card</option>
                <option value="BANK_TRANSFER">Bank transfer</option>
                <option value="E_WALLET">E-wallet</option>
              </select>
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-medium">Transaction reference (optional)</span>
              <input
                type="text"
                value={transactionRef}
                onChange={(event) => setTransactionRef(event.target.value)}
                placeholder="e.g. TXN-2026-0001"
                className="h-11 w-full rounded-2xl border border-input bg-background px-4"
              />
            </label>
            <Button
              disabled={payMutation.isPending}
              onClick={() => {
                payMutation.mutate(
                  { paymentMethod, transactionRef: transactionRef || undefined },
                  {
                    onSuccess: () => toast.success('Payment completed'),
                    onError: (error) => {
                      const apiError = error as ParsedApiError;
                      toast.error(apiError.message || 'Unable to complete payment');
                    },
                  },
                );
              }}
            >
              {payMutation.isPending ? 'Processing payment...' : 'Pay now'}
            </Button>
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-muted/20 p-4 text-muted-foreground">
            Payment is not available for this order in its current state.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
