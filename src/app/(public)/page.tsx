'use client';

import { HeroSection } from '@/components/home/hero-section';
import { CategoryCurationSection } from '@/components/home/category-curation-section';
import { NewArrivalsSection } from '@/components/home/new-arrivals-section';
import { ArchiveBannerSection } from '@/components/home/archive-banner-section';
import { NewsletterSection } from '@/components/home/newsletter-section';
import { useHomeQuery } from '@/features/home/hooks';
import { categories as fallbackCategories, newArrivals as fallbackArrivals } from '@/data/homepage-data';

const categoryFallbackImages = ['/images/category-tops.svg', '/images/category-bottoms.svg', '/images/category-accessories.svg', '/images/category-outerwear.svg'];

export default function HomePage() {
  const homeQuery = useHomeQuery();

  // Fallback keeps storefront usable if /api/home is unavailable or still incomplete in backend environments.
  const categories =
    homeQuery.data?.categories?.map((category, index) => ({
      id: category.id,
      title: category.name,
      collectionLabel: `${String(index + 1).padStart(2, '0')} / COLLECTION`,
      image: categoryFallbackImages[index % categoryFallbackImages.length],
      href: `/shop?category=${encodeURIComponent(category.slug || category.id)}`,
    })) ?? fallbackCategories;

  const newArrivals =
    homeQuery.data?.newArrivals?.map((product) => ({
      id: product.id,
      name: product.name,
      category: product.categoryName ?? 'READY-TO-WEAR',
      price: `$${product.price.toFixed(2)}`,
      image: product.images[0]?.url || '/images/product-blazer.svg',
      href: `/products/${product.slug ?? product.id}`,
    })) ?? fallbackArrivals;

  return (
    <>
      <HeroSection />
      <CategoryCurationSection categories={categories} />
      <NewArrivalsSection items={newArrivals} />
      <ArchiveBannerSection />
      <NewsletterSection />
    </>
  );
}
