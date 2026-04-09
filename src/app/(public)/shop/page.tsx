'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ProductFilters } from '@/components/products/listing/product-filters';
import { ProductGrid } from '@/components/products/listing/product-grid';
import { ProductToolbar } from '@/components/products/listing/product-toolbar';
import type { ProductListingItem, ProductSortOption } from '@/components/products/listing/types';
import { EmptyState } from '@/components/common/empty-state';
import { LoadingState } from '@/components/common/loading-state';
import { useStoreProductsQuery } from '@/features/products/hooks';

const sortQueryMap: Record<string, ProductSortOption> = {
  newest: 'Newest Arrivals',
  'price-asc': 'Price: Low to High',
  'price-desc': 'Price: High to Low',
  category: 'Category',
};

const sortValueMap: Record<ProductSortOption, string> = {
  'Newest Arrivals': 'newest',
  'Price: Low to High': 'price-asc',
  'Price: High to Low': 'price-desc',
  Category: 'category',
};

function sortProducts(products: ProductListingItem[], sortBy: ProductSortOption) {
  const list = [...products];

  if (sortBy === 'Price: Low to High') {
    return list.sort((left, right) => left.price - right.price);
  }

  if (sortBy === 'Price: High to Low') {
    return list.sort((left, right) => right.price - left.price);
  }

  if (sortBy === 'Category') {
    return list.sort((left, right) => left.category.localeCompare(right.category) || left.name.localeCompare(right.name));
  }

  return list;
}

export default function ShopPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') ?? '');
  const [selectedCategory, setSelectedCategory] = useState<'All Products' | ProductListingItem['category']>(searchParams.get('category') ?? 'All Products');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [priceRange, setPriceRange] = useState(2000);
  const [sortBy, setSortBy] = useState<ProductSortOption>(sortQueryMap[searchParams.get('sort') ?? ''] ?? 'Newest Arrivals');
  const [visibleCount, setVisibleCount] = useState(6);

  const productsQuery = useStoreProductsQuery({
    keyword: searchTerm.trim() || undefined,
    categoryId: selectedCategory !== 'All Products' ? selectedCategory : undefined,
    sortBy: sortValueMap[sortBy],
  });

  const apiProducts = useMemo<ProductListingItem[]>(
    () =>
      (productsQuery.data ?? []).map((product) => ({
        id: product.id,
        name: product.name,
        category: product.categoryName ?? 'Accessories',
        price: product.price,
        imageSrc: product.images[0]?.url || '/images/product-blazer.svg',
        imageAlt: product.images[0]?.alt || product.name,
        color: product.color || product.colors?.[0] || 'black',
        size: product.size || product.sizes?.[0] || 'M',
      })),
    [productsQuery.data],
  );

  const categoryOptions = useMemo<Array<'All Products' | string>>(() => {
    const fromData = Array.from(new Set(apiProducts.map((product) => product.category).filter(Boolean)));
    return ['All Products', ...fromData];
  }, [apiProducts]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (searchTerm.trim()) params.set('search', searchTerm.trim());
    else params.delete('search');

    if (selectedCategory !== 'All Products') params.set('category', selectedCategory);
    else params.delete('category');

    if (sortBy !== 'Newest Arrivals') params.set('sort', sortValueMap[sortBy]);
    else params.delete('sort');

    const next = params.toString();
    if (next === searchParams.toString()) return;
    router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false });
  }, [pathname, router, searchParams, searchTerm, selectedCategory, sortBy]);

  const filteredProducts = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    const filtered = apiProducts.filter((product) => {
      const matchesSearch = !keyword || [product.name, product.category, product.color, product.size].some((value) => value.toLowerCase().includes(keyword));
      const matchesCategory = selectedCategory === 'All Products' || product.category === selectedCategory;
      const matchesSize = !selectedSize || product.size === selectedSize;
      const matchesColor = !selectedColor || product.color === selectedColor;
      const matchesPrice = product.price <= priceRange;

      return matchesSearch && matchesCategory && matchesSize && matchesColor && matchesPrice;
    });

    return sortProducts(filtered, sortBy);
  }, [apiProducts, priceRange, searchTerm, selectedCategory, selectedColor, selectedSize, sortBy]);

  const visibleProducts = useMemo(() => filteredProducts.slice(0, visibleCount), [filteredProducts, visibleCount]);
  const hasMore = visibleCount < filteredProducts.length;

  if (productsQuery.isLoading) {
    return (
      <main className="min-h-screen bg-[#f6f6f3] text-zinc-900">
        <div className="mx-auto max-w-[1520px] px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
          <LoadingState label="Loading products" />
        </div>
      </main>
    );
  }

  if (productsQuery.isError) {
    return (
      <main className="min-h-screen bg-[#f6f6f3] text-zinc-900">
        <div className="mx-auto max-w-[1520px] px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
          <EmptyState title="Products unavailable" description="Please try again in a moment." actionLabel="Refresh" actionHref="/shop" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f6f6f3] text-zinc-900">
      <div className="mx-auto max-w-[1520px] px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
        <div className="grid gap-8 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-12">
          <div className="lg:sticky lg:top-8 lg:self-start">
            <ProductFilters
              selectedCategory={selectedCategory}
              categoryOptions={categoryOptions}
              selectedSize={selectedSize}
              selectedColor={selectedColor}
              priceRange={priceRange}
              onCategoryChange={(value) => {
                setSelectedCategory(value);
                setVisibleCount(6);
              }}
              onSizeChange={(value) => {
                setSelectedSize(value);
                setVisibleCount(6);
              }}
              onColorChange={(value) => {
                setSelectedColor(value);
                setVisibleCount(6);
              }}
              onPriceChange={(value) => {
                setPriceRange(value);
                setVisibleCount(6);
              }}
            />
          </div>

          <section className="space-y-8 pt-1">
            <ProductToolbar
              searchTerm={searchTerm}
              resultCount={filteredProducts.length}
              sortBy={sortBy}
              onSearchChange={(value) => {
                setSearchTerm(value);
                setVisibleCount(6);
              }}
              onSortChange={(value) => {
                setSortBy(value);
                setVisibleCount(6);
              }}
            />

            {filteredProducts.length > 0 ? (
              <ProductGrid
                products={filteredProducts}
                visibleCount={visibleCount}
                onLoadMore={() => setVisibleCount((current) => Math.min(current + 6, filteredProducts.length))}
                hasMore={hasMore}
              />
            ) : (
              <div className="flex min-h-[20rem] items-center justify-center border border-dashed border-zinc-300 bg-white/60 text-sm uppercase tracking-[0.22em] text-zinc-400">
                No products match the current filters.
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
