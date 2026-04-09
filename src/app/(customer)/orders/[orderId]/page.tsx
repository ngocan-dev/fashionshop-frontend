'use client';

import Link from 'next/link';
import { toast } from 'sonner';
import { useParams } from 'next/navigation';
import { EmptyState } from '@/components/common/empty-state';
import { LoadingState } from '@/components/common/loading-state';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useCancelMyOrderMutation, useMyOrderPaymentQuery, useMyOrderQuery } from '@/features/orders/hooks';
import { useInvoicesByOrderQuery } from '@/features/invoices/hooks';
import { isOrderCancellable, isOrderPayable } from '@/features/orders/rules';
import type { ParsedApiError } from '@/lib/api/errors';

export default function OrderDetailPage() {
  const params = useParams<{ orderId: string }>();
  const orderQuery = useMyOrderQuery(params.orderId);
  const paymentQuery = useMyOrderPaymentQuery(params.orderId);
  const invoiceQuery = useInvoicesByOrderQuery(params.orderId);
  const cancelMutation = useCancelMyOrderMutation(params.orderId);

  if (orderQuery.isLoading) return <LoadingState label="Loading order" />;
  if (orderQuery.isError) return <EmptyState title="Order unavailable" description="Unable to load order details." actionLabel="Back to orders" actionHref="/orders" />;
  if (!orderQuery.data) return <EmptyState title="Order not found" actionLabel="Back to orders" actionHref="/orders" />;

  const canCancel = isOrderCancellable(orderQuery.data.status);
  const canPay = isOrderPayable(orderQuery.data, paymentQuery.data);
  const invoice = invoiceQuery.data ?? null;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold">Order {orderQuery.data.orderNumber ?? orderQuery.data.id}</h1>
            <p className="mt-1 text-sm text-muted-foreground">Status: {orderQuery.data.status}</p>
          </div>
          <div className="flex items-center gap-2">
            {invoice ? (
              <Button asChild variant="outline">
                <Link href={`/invoices/${invoice.id}`}>View invoice</Link>
              </Button>
            ) : null}
            {canPay ? (
              <Button asChild variant="outline">
                <Link href={`/orders/${orderQuery.data.id}/payment`}>Pay now</Link>
              </Button>
            ) : null}
            <Button
              variant="outline"
              disabled={!canCancel || cancelMutation.isPending}
              onClick={() =>
                cancelMutation.mutate(undefined, {
                  onSuccess: () => toast.success('Order cancelled'),
                  onError: (error) => {
                    const apiError = error as ParsedApiError;
                    toast.error(apiError.message || 'Unable to cancel order');
                  },
                })
              }
            >
              {cancelMutation.isPending ? 'Cancelling...' : 'Cancel order'}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-2xl border border-border bg-muted/20 p-4 text-sm">
          <div className="flex justify-between"><span>Payment method</span><strong>{orderQuery.data.paymentMethod ?? '-'}</strong></div>
          <div className="mt-2 flex justify-between"><span>Subtotal</span><strong>${orderQuery.data.subtotal.toFixed(2)}</strong></div>
          <div className="mt-2 flex justify-between"><span>Shipping</span><strong>${orderQuery.data.shippingFee.toFixed(2)}</strong></div>
          <div className="mt-2 flex justify-between"><span>Discount</span><strong>${orderQuery.data.discount.toFixed(2)}</strong></div>
          <div className="mt-2 flex justify-between border-t border-border pt-2"><span>Total</span><strong>${orderQuery.data.total.toFixed(2)}</strong></div>
        </div>
        {orderQuery.data.items.map((item) => (
          <div key={item.productId} className="flex justify-between rounded-2xl bg-muted/30 p-4">
            <span>{item.name} x {item.quantity}</span>
            <strong>${item.total.toFixed(2)}</strong>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
