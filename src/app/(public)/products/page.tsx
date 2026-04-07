'use client';

import { useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { EmptyState } from '@/components/common/empty-state';
import { LoadingState } from '@/components/common/loading-state';
import { Input } from '@/components/ui/input';
import { ProductCard } from '@/features/products/components/product-card';
import { useStoreProductsQuery, useProductSearchQuery } from '@/features/products/hooks';
import { FilterSidebar } from '@/components/products/filters/filter-sidebar';
import type { CategoryOption } from '@/components/products/filters/category-filter';
import type { ColorOption } from '@/components/products/filters/color-filter';
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
  const [selectedCategory, setSelectedCategory] = useState('all-products');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState('all');
  const [priceRange, setPriceRange] = useState(2000);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const storeQuery = useStoreProductsQuery();
  const searchQuery = useProductSearchQuery(keyword);

  const products = useMemo(() => (keyword ? searchQuery.data ?? [] : storeQuery.data ?? []), [keyword, searchQuery.data, storeQuery.data]);

  const categoryOptions: CategoryOption[] = [
    { id: 'all-products', label: 'All Products' },
    { id: 'outerwear', label: 'Outerwear' },
    { id: 'tailoring', label: 'Tailoring' },
    { id: 'knitwear', label: 'Knitwear' },
    { id: 'accessories', label: 'Accessories' },
  ];

  const sizeOptions: string[] = ['XS', 'S', 'M', 'L', 'XL'];

  const colorOptions: ColorOption[] = [
    { id: 'all', label: 'All', swatch: '#111111' },
    { id: 'white', label: 'White', swatch: '#f4f4f5' },
    { id: 'gray', label: 'Gray', swatch: '#8b8d96' },
    { id: 'cream', label: 'Cream', swatch: '#d7d5d0' },
    { id: 'black', label: 'Black', swatch: '#2a2a2d' },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const inPriceRange = product.price >= 0 && product.price <= priceRange;

      const categorySource = `${product.categoryName ?? ''} ${product.name}`.toLowerCase();
      const categoryMatched = selectedCategory === 'all-products' || categorySource.includes(selectedCategory);

      const productColors = normalizeProductColors(product).map((value) => value.toLowerCase());
      const colorMatched = selectedColor === 'all' || productColors.includes(selectedColor.toLowerCase());

      const productSizes = normalizeProductSizes(product);
      const sizeMatched = selectedSizes.length === 0 || selectedSizes.some((size) => productSizes.includes(size));

      return inPriceRange && categoryMatched && colorMatched && sizeMatched;
    });
  }, [priceRange, products, selectedCategory, selectedColor, selectedSizes]);

  const toggleSize = (size: string) => {
    setSelectedSizes((current) => (current.includes(size) ? current.filter((item) => item !== size) : [...current, size]));
  };

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
        <div className="mt-5 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className="h-11 rounded-md border border-zinc-300 bg-white px-5 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-800 transition hover:bg-zinc-100"
          >
            Open Filters
          </button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[290px_minmax(0,1fr)]">
        <div className="hidden lg:block">
          <div className="sticky top-24">
            <FilterSidebar
              categoryOptions={categoryOptions}
              sizeOptions={sizeOptions}
              colorOptions={colorOptions}
              selectedCategory={selectedCategory}
              selectedSizes={selectedSizes}
              selectedColor={selectedColor}
              priceRange={priceRange}
              onCategoryChange={setSelectedCategory}
              onToggleSize={toggleSize}
              onColorChange={setSelectedColor}
              onPriceChange={setPriceRange}
              minPrice={0}
              maxPrice={2000}
            />
          </div>
        </div>

        <div>
          {isLoading ? <LoadingState label="Loading products" /> : null}
          {!isLoading && isError ? <EmptyState title="Unable to load products" description="Please try again." actionLabel="Refresh" actionHref="/products" /> : null}
          {!isLoading && !isError && filteredProducts.length === 0 ? <EmptyState title="No products found" description="Try a different filter or search term." actionLabel="Back to home" actionHref="/" /> : null}

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </div>

      {mobileFiltersOpen ? (
        <div className="fixed inset-0 z-50 bg-black/35 lg:hidden">
          <div className="absolute left-0 top-0 h-full w-[min(90vw,320px)] overflow-y-auto bg-white p-4">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-700">Filters</p>
              <button
                type="button"
                aria-label="Close filters"
                onClick={() => setMobileFiltersOpen(false)}
                className="rounded-full p-2 text-zinc-700 hover:bg-zinc-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <FilterSidebar
              categoryOptions={categoryOptions}
              sizeOptions={sizeOptions}
              colorOptions={colorOptions}
              selectedCategory={selectedCategory}
              selectedSizes={selectedSizes}
              selectedColor={selectedColor}
              priceRange={priceRange}
              onCategoryChange={setSelectedCategory}
              onToggleSize={toggleSize}
              onColorChange={setSelectedColor}
              onPriceChange={setPriceRange}
              minPrice={0}
              maxPrice={2000}
            />
          </div>
          <button type="button" className="h-full w-full" aria-label="Close filters" onClick={() => setMobileFiltersOpen(false)} />
        </div>
      ) : null}
    </div>
  );
}
