'use client';

import { useMemo, useState } from 'react';
import { EmptyState } from '@/components/common/empty-state';
import { LoadingState } from '@/components/common/loading-state';
import { Input } from '@/components/ui/input';
import { ProductCard } from '@/features/products/components/product-card';
import { useStoreProductsQuery, useProductSearchQuery } from '@/features/products/hooks';
import type { Product } from '@/types/product';

function normalizeProductColors(product: Product) {
  const values = [product.color, ...(product.colors ?? [])].filter(Boolean) as string[];
  return Array.from(new Set(values.map((value) => value.trim())));
}

function normalizeProductSizes(product: Product) {
  const values = [product.size, ...(product.sizes ?? [])].filter(Boolean) as string[];
  return Array.from(new Set(values.map((value) => value.trim().toUpperCase())));
}

export default function ProductsPage() {
  const [keyword, setKeyword] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [selectedColor, setSelectedColor] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');

  const storeQuery = useStoreProductsQuery();
  const searchQuery = useProductSearchQuery(keyword);

  const products = useMemo(() => (keyword ? searchQuery.data ?? [] : storeQuery.data ?? []), [keyword, searchQuery.data, storeQuery.data]);

  const colorOptions = useMemo(() => {
    const allColors = products.flatMap((product) => normalizeProductColors(product));
    return Array.from(new Set(allColors)).sort((a, b) => a.localeCompare(b));
  }, [products]);

  const sizeOptions = useMemo(() => {
    const allSizes = products.flatMap((product) => normalizeProductSizes(product));
    return Array.from(new Set(allSizes)).sort((a, b) => a.localeCompare(b));
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const inPriceRange = product.price >= minPrice && product.price <= maxPrice;

      const productColors = normalizeProductColors(product).map((value) => value.toLowerCase());
      const colorMatched = selectedColor === 'all' || productColors.includes(selectedColor.toLowerCase());

      const productSizes = normalizeProductSizes(product);
      const sizeMatched = selectedSize === 'all' || productSizes.includes(selectedSize.toUpperCase());

      return inPriceRange && colorMatched && sizeMatched;
    });
  }, [maxPrice, minPrice, products, selectedColor, selectedSize]);

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

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Min Price</span>
            <Input
              type="number"
              min={0}
              max={100000}
              value={minPrice}
              onChange={(event) => setMinPrice(Math.max(0, Number(event.target.value) || 0))}
              aria-label="Minimum price"
            />
          </label>

          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Max Price</span>
            <Input
              type="number"
              min={0}
              max={100000}
              value={maxPrice}
              onChange={(event) => setMaxPrice(Math.min(100000, Number(event.target.value) || 100000))}
              aria-label="Maximum price"
            />
          </label>

          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Color</span>
            <select
              value={selectedColor}
              onChange={(event) => setSelectedColor(event.target.value)}
              aria-label="Filter by color"
              className="h-11 w-full rounded-2xl border border-input bg-background px-4 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            >
              <option value="all">All colors</option>
              {colorOptions.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Size</span>
            <select
              value={selectedSize}
              onChange={(event) => setSelectedSize(event.target.value)}
              aria-label="Filter by size"
              className="h-11 w-full rounded-2xl border border-input bg-background px-4 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            >
              <option value="all">All sizes</option>
              {sizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {isLoading ? <LoadingState label="Loading products" /> : null}
      {!isLoading && isError ? <EmptyState title="Unable to load products" description="Please try again." actionLabel="Refresh" actionHref="/products" /> : null}
      {!isLoading && !isError && filteredProducts.length === 0 ? <EmptyState title="No products found" description="Try a different filter or search term." actionLabel="Back to home" actionHref="/" /> : null}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </div>
  );
}
