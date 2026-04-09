'use client';

import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { EmptyState } from '@/components/common/empty-state';
import { LoadingState } from '@/components/common/loading-state';
import { useManageOrderQuery, useUpdateManageOrderStatusMutation } from '@/features/orders/hooks';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { getStaffManageableStatuses } from '@/features/orders/rules';
import type { ParsedApiError } from '@/lib/api/errors';

export default function StaffOrderDetailPage() {
  const params = useParams<{ orderId: string }>();
  const orderQuery = useManageOrderQuery(params.orderId);
  const mutation = useUpdateManageOrderStatusMutation(params.orderId);

  if (orderQuery.isLoading) return <LoadingState label="Loading order" />;
  if (orderQuery.isError) return <EmptyState title="Order unavailable" description="Unable to load order details right now." actionLabel="Back" actionHref="/staff/orders" />;
  if (!orderQuery.data) return <EmptyState title="Order not found" actionLabel="Back" actionHref="/staff/orders" />;

  const nextStatuses = getStaffManageableStatuses(orderQuery.data.status);

  return (
    <Card>
      <CardHeader>
        <h1 className="text-2xl font-semibold">Order detail</h1>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>Status: {orderQuery.data.status}</div>
        <div className="flex gap-2">
          {nextStatuses.length === 0 ? <p className="text-sm text-muted-foreground">No further status updates allowed.</p> : null}
          {nextStatuses.map((status) => (
            <Button
              key={status}
              variant="outline"
              disabled={mutation.isPending}
              onClick={() =>
                mutation.mutate(status, {
                  onSuccess: () => toast.success('Status updated'),
                  onError: (error) => {
                    const apiError = error as ParsedApiError;
                    toast.error(apiError.message || 'Unable to update order status');
                  },
                })
              }
            >
              {status}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
