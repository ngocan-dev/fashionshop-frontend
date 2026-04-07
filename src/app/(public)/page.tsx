'use client';

import { useHomeQuery } from '@/features/home/hooks';
import { LoadingState } from '@/components/common/loading-state';
import { EmptyState } from '@/components/common/empty-state';
import { ProductCard } from '@/features/products/components/product-card';

export default function HomePage() {
  const { data, isLoading, isError } = useHomeQuery();

  if (isLoading) return <div className="container-shell py-10"><LoadingState label="Loading home" /></div>;
  if (isError || !data) return <div className="container-shell py-10"><EmptyState title="Home content unavailable" description="Try again later." actionLabel="Browse products" actionHref="/products" /></div>;

  return (
    <div className="container-shell space-y-12 py-10">
      <section className="rounded-[2rem] bg-gradient-to-br from-brand-600 to-brand-400 px-6 py-16 text-white shadow-xl shadow-brand-600/20 sm:px-10">
        <p className="text-sm uppercase tracking-[0.3em] text-white/70">FashionShop</p>
        <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight sm:text-6xl">Modern fashion storefront built for customers, staff, and operations.</h1>
        <p className="mt-5 max-w-xl text-white/85">Browse the collection, manage orders, and operate the storefront through a single production-ready frontend.</p>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {data.banners.map((banner) => (
          <div key={banner.title} className="rounded-3xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">{banner.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{banner.description}</p>
            <a className="mt-4 inline-flex text-sm font-medium text-brand-700" href={banner.href}>{banner.ctaLabel}</a>
          </div>
        ))}
      </section>

      <section className="space-y-5">
        <h2 className="text-2xl font-semibold tracking-tight">Featured products</h2>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {data.featuredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>
    </div>
  );
}
