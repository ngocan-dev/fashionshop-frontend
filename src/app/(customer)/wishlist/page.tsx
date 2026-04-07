'use client';

import { toast } from 'sonner';
import { Heart, Trash2 } from 'lucide-react';
import { EmptyState } from '@/components/common/empty-state';
import { LoadingState } from '@/components/common/loading-state';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useDeleteWishlistItemMutation, useWishlistQuery } from '@/features/wishlist/hooks';

export default function WishlistPage() {
  const wishlistQuery = useWishlistQuery();
  const deleteMutation = useDeleteWishlistItemMutation();

  if (wishlistQuery.isLoading) return <LoadingState label="Loading wishlist" />;
  if (!wishlistQuery.data || wishlistQuery.data.length === 0) return <EmptyState title="Wishlist is empty" description="Save products you want to revisit later." actionLabel="Browse products" actionHref="/products" icon={<Heart className="h-5 w-5" />} />;

  return (
    <Card>
      <CardHeader><h1 className="text-2xl font-semibold">Wishlist</h1></CardHeader>
      <CardContent className="space-y-4">
        {wishlistQuery.data.map((item) => (
          <div key={item.productId} className="flex items-center justify-between rounded-2xl border border-border p-4">
            <div>
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => deleteMutation.mutate(item.productId, { onSuccess: () => toast.success('Removed from wishlist') })}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
