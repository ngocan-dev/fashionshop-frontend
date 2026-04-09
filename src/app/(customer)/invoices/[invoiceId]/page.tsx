'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { EmptyState } from '@/components/common/empty-state';
import { LoadingState } from '@/components/common/loading-state';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useMyInvoiceQuery } from '@/features/invoices/hooks';

export default function InvoiceDetailPage() {
  const params = useParams<{ invoiceId: string }>();
  const invoiceQuery = useMyInvoiceQuery(params.invoiceId);

  if (invoiceQuery.isLoading) return <LoadingState label="Loading invoice" />;
  if (!invoiceQuery.data) return <EmptyState title="Invoice not found" actionLabel="Back to orders" actionHref="/orders" />;

  return (
    <Card>
      <CardHeader><h1 className="text-2xl font-semibold">Invoice detail</h1></CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div>Invoice #: {invoiceQuery.data.invoiceNumber ?? invoiceQuery.data.id}</div>
        <div>Order #: {invoiceQuery.data.orderId}</div>
        <div>Billing name: {invoiceQuery.data.billingName}</div>
        <div>Billing address: {invoiceQuery.data.billingAddress}</div>
        <div>Total: ${invoiceQuery.data.total.toFixed(2)}</div>
        <div className="pt-3">
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline"><Link href={`/orders/${invoiceQuery.data.orderId}`}>View order</Link></Button>
            <Button asChild variant="outline"><Link href={`/orders/${invoiceQuery.data.orderId}/payment`}>View payment</Link></Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
