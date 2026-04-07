'use client';

import { toast } from 'sonner';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { EmptyState } from '@/components/common/empty-state';
import { LoadingState } from '@/components/common/loading-state';
import { ConfirmDialog } from '@/components/common/confirm-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useCartQuery, useDeleteCartItemMutation, useUpdateCartItemQuantityMutation } from '@/features/cart/hooks';
import { useState } from 'react';

export default function CartPage() {
  const cartQuery = useCartQuery();
  const [confirmItemId, setConfirmItemId] = useState<string | null>(null);
  const deleteMutation = useDeleteCartItemMutation();
  const quantityMutation = useUpdateCartItemQuantityMutation();

  if (cartQuery.isLoading) return <LoadingState label="Loading cart" />;
  if (!cartQuery.data) return <EmptyState title="Cart is empty" description="Add products from the catalog to begin checkout." actionLabel="Browse products" actionHref="/products" icon={<ShoppingCart className="h-5 w-5" />} />;

  return (
    <>
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-semibold">Cart</h1>
        </CardHeader>
        <CardContent className="space-y-4">
          {cartQuery.data.items.length === 0 ? (
            <EmptyState title="No items in cart" description="Your cart is currently empty." actionLabel="Browse products" actionHref="/products" />
          ) : (
            cartQuery.data.items.map((item) => {
              return (
                <div key={item.id} className="flex flex-col gap-4 rounded-2xl border border-border p-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="font-medium">{item.product.name}</h3>
                    <p className="text-sm text-muted-foreground">${item.product.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => quantityMutation.mutate({ itemId: item.id, quantity: Math.max(1, item.quantity - 1) })}>-</Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button variant="outline" size="sm" onClick={() => quantityMutation.mutate({ itemId: item.id, quantity: item.quantity + 1 })}>+</Button>
                    <Button variant="ghost" size="sm" aria-label="Delete cart item" onClick={() => setConfirmItemId(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })
          )}
          <div className="rounded-2xl bg-muted/30 p-4 text-right">
            <div className="text-sm text-muted-foreground">Total</div>
            <div className="text-2xl font-semibold">${cartQuery.data.total.toFixed(2)}</div>
          </div>
          <div className="flex justify-end">
            <Button asChild><a href="/checkout">Proceed to checkout</a></Button>
          </div>
        </CardContent>
      </Card>
      <ConfirmDialog
        open={Boolean(confirmItemId)}
        title="Remove item from cart?"
        description="This action will update the cart immediately."
        confirmLabel="Remove"
        destructive
        onOpenChange={(open) => !open && setConfirmItemId(null)}
        onConfirm={() => {
          if (!confirmItemId) return;
          deleteMutation.mutate(confirmItemId, { onSuccess: () => toast.success('Item removed') });
          setConfirmItemId(null);
        }}
      />
    </>
  );
}
