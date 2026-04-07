'use client';

import { useParams } from 'next/navigation';
import { EmptyState } from '@/components/common/empty-state';
import { LoadingState } from '@/components/common/loading-state';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useStoreProductQuery } from '@/features/products/hooks';

export default function ProductDetailPage() {
  const params = useParams<{ slug: string }>();
  const { data, isLoading, isError } = useStoreProductQuery(params.slug);

  if (isLoading) return <div className="container-shell py-10"><LoadingState label="Loading product" /></div>;
  if (isError || !data) return <div className="container-shell py-10"><EmptyState title="Product unavailable" description="The requested product could not be loaded." actionLabel="Browse products" actionHref="/products" /></div>;

  return (
    <div className="container-shell py-10">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="overflow-hidden rounded-[2rem] border border-border bg-card">
          <div className="aspect-square bg-muted">
            {data.images[0] ? <img src={data.images[0].url} alt={data.images[0].alt ?? data.name} className="h-full w-full object-cover" /> : null}
          </div>
        </div>
        <div className="space-y-5">
          <Badge>{data.categoryName ?? 'Fashion'}</Badge>
          <h1 className="text-4xl font-semibold tracking-tight">{data.name}</h1>
          <p className="text-muted-foreground">{data.description}</p>
          <div className="text-3xl font-semibold">${data.price.toFixed(2)}</div>
          <div className="flex gap-3">
            <Button>Add to cart</Button>
            <Button variant="outline">Add to wishlist</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
