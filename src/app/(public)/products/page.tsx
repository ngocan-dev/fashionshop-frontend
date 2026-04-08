'use client';

import { useMemo, useState } from 'react';
import { ProductFilters } from '@/components/products/listing/product-filters';
import { ProductGrid } from '@/components/products/listing/product-grid';
import { ProductToolbar } from '@/components/products/listing/product-toolbar';
import type { ProductListingItem, ProductSortOption } from '@/components/products/listing/types';

const productCatalog: ProductListingItem[] = [
  { id: 'modular-tech-parka', name: 'Modular Tech Parka', category: 'Outerwear', price: 840, imageSrc: '/images/product-blazer.svg', imageAlt: 'Modular Tech Parka in technical orange and charcoal', color: 'black', size: 'M' },
  { id: 'boxy-sculptural-blazer', name: 'Boxy Sculptural Blazer', category: 'Tailoring', price: 1250, imageSrc: '/images/product-blazer.svg', imageAlt: 'Boxy Sculptural Blazer in structured gray tailoring', color: 'gray', size: 'S' },
  { id: 'archival-cargo-trousers', name: 'Archival Cargo Trousers', category: 'Bottoms', price: 560, imageSrc: '/images/product-trousers.svg', imageAlt: 'Archival Cargo Trousers in washed green denim', color: 'dark-brown', size: 'L' },
  { id: 'oversized-ribbed-knit', name: 'Oversized Ribbed Knit', category: 'Knitwear', price: 720, imageSrc: '/images/product-shirt.svg', imageAlt: 'Oversized Ribbed Knit in deep teal', color: 'off-white', size: 'XL' },
  { id: 'tactical-layering-vest', name: 'Tactical Layering Vest', category: 'Outerwear', price: 440, imageSrc: '/images/product-blazer.svg', imageAlt: 'Tactical Layering Vest in high-visibility orange', color: 'black', size: 'M' },
  { id: 'fluid-silk-shirt', name: 'Fluid Silk Shirt', category: 'Tailoring', price: 380, imageSrc: '/images/product-shirt.svg', imageAlt: 'Fluid Silk Shirt in muted rose satin', color: 'light-gray', size: 'S' },
  { id: 'architectural-shell-coat', name: 'Architectural Shell Coat', category: 'Outerwear', price: 1180, imageSrc: '/images/product-blazer.svg', imageAlt: 'Architectural Shell Coat with sharp silhouette', color: 'gray', size: 'L' },
  { id: 'narrow-pleat-trousers', name: 'Narrow Pleat Trousers', category: 'Bottoms', price: 610, imageSrc: '/images/product-trousers.svg', imageAlt: 'Narrow Pleat Trousers in dark green', color: 'dark-brown', size: 'M' },
  { id: 'merino-column-knit', name: 'Merino Column Knit', category: 'Knitwear', price: 690, imageSrc: '/images/product-shirt.svg', imageAlt: 'Merino Column Knit in teal ribbing', color: 'off-white', size: 'XS' },
  { id: 'technical-trench-layer', name: 'Technical Trench Layer', category: 'Outerwear', price: 920, imageSrc: '/images/product-blazer.svg', imageAlt: 'Technical Trench Layer with storm-ready panels', color: 'black', size: 'XL' },
  { id: 'sculpted-tailoring-jacket', name: 'Sculpted Tailoring Jacket', category: 'Tailoring', price: 980, imageSrc: '/images/product-blazer.svg', imageAlt: 'Sculpted Tailoring Jacket in charcoal melange', color: 'gray', size: 'M' },
  { id: 'utility-canvas-trousers', name: 'Utility Canvas Trousers', category: 'Bottoms', price: 510, imageSrc: '/images/product-trousers.svg', imageAlt: 'Utility Canvas Trousers in faded olive', color: 'dark-brown', size: 'L' },
  { id: 'ribbed-layer-tee', name: 'Ribbed Layer Tee', category: 'Knitwear', price: 260, imageSrc: '/images/product-shirt.svg', imageAlt: 'Ribbed Layer Tee in washed slate', color: 'light-gray', size: 'S' },
  { id: 'canvas-overcoat', name: 'Canvas Overcoat', category: 'Outerwear', price: 1040, imageSrc: '/images/product-blazer.svg', imageAlt: 'Canvas Overcoat with an oversized cut', color: 'black', size: 'L' },
  { id: 'pressed-wool-blazer', name: 'Pressed Wool Blazer', category: 'Tailoring', price: 1320, imageSrc: '/images/product-blazer.svg', imageAlt: 'Pressed Wool Blazer in precise gray tailoring', color: 'gray', size: 'M' },
  { id: 'archival-straight-jeans', name: 'Archival Straight Jeans', category: 'Bottoms', price: 540, imageSrc: '/images/product-trousers.svg', imageAlt: 'Archival Straight Jeans in deep washed green', color: 'dark-brown', size: 'S' },
  { id: 'textured-wool-pullover', name: 'Textured Wool Pullover', category: 'Knitwear', price: 760, imageSrc: '/images/product-shirt.svg', imageAlt: 'Textured Wool Pullover in forest teal', color: 'off-white', size: 'M' },
  { id: 'reflective-panel-parka', name: 'Reflective Panel Parka', category: 'Outerwear', price: 890, imageSrc: '/images/product-blazer.svg', imageAlt: 'Reflective Panel Parka with safety striping', color: 'black', size: 'XL' },
  { id: 'soft-shoulder-jacket', name: 'Soft Shoulder Jacket', category: 'Tailoring', price: 1150, imageSrc: '/images/product-blazer.svg', imageAlt: 'Soft Shoulder Jacket with a relaxed drape', color: 'light-gray', size: 'S' },
  { id: 'relaxed-cargo-trousers', name: 'Relaxed Cargo Trousers', category: 'Bottoms', price: 590, imageSrc: '/images/product-trousers.svg', imageAlt: 'Relaxed Cargo Trousers in dark moss denim', color: 'dark-brown', size: 'M' },
  { id: 'longline-rib-knit', name: 'Longline Rib Knit', category: 'Knitwear', price: 680, imageSrc: '/images/product-shirt.svg', imageAlt: 'Longline Rib Knit in warm charcoal green', color: 'gray', size: 'L' },
  { id: 'panelled-field-coat', name: 'Panelled Field Coat', category: 'Outerwear', price: 960, imageSrc: '/images/product-blazer.svg', imageAlt: 'Panelled Field Coat in a technical finish', color: 'black', size: 'M' },
  { id: 'silk-drape-shirt', name: 'Silk Drape Shirt', category: 'Tailoring', price: 420, imageSrc: '/images/product-shirt.svg', imageAlt: 'Silk Drape Shirt in muted satin brown', color: 'off-white', size: 'XS' },
];

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

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All Products' | ProductListingItem['category']>('All Products');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [priceRange, setPriceRange] = useState(2000);
  const [sortBy, setSortBy] = useState<ProductSortOption>('Newest Arrivals');
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredProducts = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    const filtered = productCatalog.filter((product) => {
      const matchesSearch = !keyword || [product.name, product.category, product.color, product.size].some((value) => value.toLowerCase().includes(keyword));
      const matchesCategory = selectedCategory === 'All Products' || product.category === selectedCategory;
      const matchesSize = !selectedSize || product.size === selectedSize;
      const matchesColor = !selectedColor || product.color === selectedColor;
      const matchesPrice = product.price <= priceRange;

      return matchesSearch && matchesCategory && matchesSize && matchesColor && matchesPrice;
    });

    return sortProducts(filtered, sortBy);
  }, [priceRange, searchTerm, selectedCategory, selectedColor, selectedSize, sortBy]);

  const visibleProducts = useMemo(() => filteredProducts.slice(0, visibleCount), [filteredProducts, visibleCount]);
  const hasMore = visibleCount < filteredProducts.length;

  return (
    <main className="min-h-screen bg-[#f6f6f3] text-zinc-900">
      <div className="mx-auto max-w-[1520px] px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
        <div className="grid gap-8 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-12">
          <div className="lg:sticky lg:top-8 lg:self-start">
            <ProductFilters
              selectedCategory={selectedCategory}
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
