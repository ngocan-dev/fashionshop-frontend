'use client';

import { useMemo, useState } from 'react';
import { EmptyState } from '@/components/common/empty-state';
import { LoadingState } from '@/components/common/loading-state';
import { Input } from '@/components/ui/input';
import { ProductCard } from '@/features/products/components/product-card';
import { useStoreProductsQuery, useProductSearchQuery } from '@/features/products/hooks';

export default function ProductsPage() {
  const [keyword, setKeyword] = useState('');
  const storeQuery = useStoreProductsQuery();
  const searchQuery = useProductSearchQuery(keyword);
  const products = useMemo(() => (keyword ? searchQuery.data ?? [] : storeQuery.data ?? []), [keyword, searchQuery.data, storeQuery.data]);
  const isLoading = keyword ? searchQuery.isLoading : storeQuery.isLoading;
  const isError = keyword ? searchQuery.isError : storeQuery.isError;

  return (
    <div className="container-shell space-y-6 py-10">
      <div className="rounded-3xl border border-border bg-card p-6">
        <h1 className="text-3xl font-semibold tracking-tight">Products</h1>
        <p className="mt-2 text-sm text-muted-foreground">Search the store catalog and open any product detail page.</p>
        <div className="mt-5 max-w-lg">
          <Input value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="Search products" aria-label="Search products" />
        </div>
      </div>

      {isLoading ? <LoadingState label="Loading products" /> : null}
      {!isLoading && isError ? <EmptyState title="Unable to load products" description="Please try again." actionLabel="Refresh" actionHref="/products" /> : null}
      {!isLoading && !isError && products.length === 0 ? <EmptyState title="No products found" description="Try a different search term." actionLabel="Back to home" actionHref="/" /> : null}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </div>
  );
}
