'use client';

import { toast } from 'sonner';
import { LoadingState } from '@/components/common/loading-state';
import { EmptyState } from '@/components/common/empty-state';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useCheckoutSummaryQuery, useCreateOrderMutation } from '@/features/orders/hooks';
import { CheckoutForm } from '@/features/orders/components/checkout-form';

export default function CheckoutPage() {
  const summaryQuery = useCheckoutSummaryQuery();
  const createOrderMutation = useCreateOrderMutation();

  if (summaryQuery.isLoading) return <LoadingState label="Loading checkout" />;
  if (!summaryQuery.data) return <EmptyState title="Checkout unavailable" description="Add items to your cart first." actionLabel="Go to cart" actionHref="/cart" />;

  return (
    <Card>
      <CardHeader>
        <h1 className="text-2xl font-semibold">Checkout</h1>
      </CardHeader>
      <CardContent className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <CheckoutForm summary={summaryQuery.data} onSubmit={(values) => createOrderMutation.mutate(values, { onSuccess: () => toast.success('Order placed') })} />
        <div className="rounded-3xl bg-muted/30 p-5">
          <h2 className="font-semibold">Order summary</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><strong>${summaryQuery.data.subtotal.toFixed(2)}</strong></div>
            <div className="flex justify-between"><span>Shipping</span><strong>${summaryQuery.data.shippingFee.toFixed(2)}</strong></div>
            <div className="flex justify-between"><span>Discount</span><strong>${summaryQuery.data.discount.toFixed(2)}</strong></div>
            <div className="flex justify-between border-t border-border pt-2 text-base"><span>Total</span><strong>${summaryQuery.data.total.toFixed(2)}</strong></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
