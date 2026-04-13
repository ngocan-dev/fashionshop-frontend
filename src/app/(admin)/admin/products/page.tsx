'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {useManageProductsQuery, useDeleteManageProductMutation} from '@/features/products/hooks';
import { useDebounce } from '@/hooks/use-debounce';
import { toast } from 'sonner';
import { ConfirmDialog } from '@/components/common/confirm-dialog';
import { LoadingState } from '@/components/common/loading-state';
import { EmptyState } from '@/components/common/empty-state';
import { ProductTable } from '@/features/products/components/admin/product-table';
import { ProductStats } from '@/features/products/components/product-stats';
import { Pagination } from '@/components/common/pagnition';

export default function AdminProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const debouncedSearch = useDebounce(searchTerm, 500);

  const { data: response, isLoading } = useManageProductsQuery({
    keyword: debouncedSearch,
    page: page - 1,
    size: pageSize
  });

  const deleteMutation = useDeleteManageProductMutation();

  const products = response?.data?.items ?? [];
  const totalItems = response?.data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));


  const outOfStockCount = products.filter(p => p.stock === 0).length;
  const activeCount = products.filter(p => p.active).length;

  const handleDelete = () => {
    if (!deleteId) return;
    deleteMutation.mutate(deleteId, {
      onSuccess: () => {
        toast.success('Product deleted successfully');
        setDeleteId(null);
      },
      onError: () => {
        toast.error('Failed to delete product');
      }
    });
  };

  if (isLoading && products.length === 0) {
    return <LoadingState label="Loading products..." />;
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="font-headline text-4xl font-extrabold tracking-tighter text-black uppercase">Inventory</h2>
          <p className="text-sm text-neutral-500 mt-2 font-body">Manage your editorial collection and product stock.</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-6 py-3 bg-surface-container-lowest border border-neutral-200 hover:bg-neutral-50 transition-all rounded-md">
            <span className="material-symbols-outlined text-lg">filter_list</span>
            <span className="font-label text-xs tracking-widest uppercase font-semibold">Filter</span>
          </button>
          <Link
            href="/admin/products/new"
            className="flex items-center gap-2 px-8 py-3 bg-primary text-white hover:bg-primary-fixed transition-all scale-100 active:scale-95 rounded-md"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            <span className="font-label text-xs tracking-widest uppercase font-bold">Add Product</span>
          </Link>
        </div>
      </div>

      <ProductStats
        totalItems={totalItems}
        outOfStock={outOfStockCount}
        active={activeCount}
      />

      {/* Search Bar (Specific to products list) */}
      <div className="mb-6 relative">
        <div className="flex items-center bg-surface-container-lowest border border-neutral-100 px-4 py-3 rounded-xl w-full focus-within:ring-1 focus-within:ring-black transition-all">
          <span className="material-symbols-outlined text-neutral-400 text-xl mr-3">search</span>
          <input
            className="bg-transparent border-none focus:ring-0 text-sm w-full font-body placeholder:text-neutral-400"
            placeholder="Search products by name, category or SKU..."
            type="text"
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
          />
        </div>
      </div>

      {/* Main Data Table Container */}
      <div className="bg-surface-container-lowest overflow-hidden rounded-xl border border-neutral-100">
        <div className="overflow-x-auto">
          {products.length === 0 && !isLoading ? (
            <div className="py-20">
              <EmptyState
                title="No products found"
                description="Try adjusting your search or filters to find what you're looking for."
                actionLabel="Reset Search"
                onAction={() => setSearchTerm('')}
              />
            </div>
          ) : (
            <ProductTable
              products={products}
              onDelete={(id) => setDeleteId(id)}
            />
          )}
        </div>

        <Pagination
          page={page}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={setPage}
        />
      </div>

      <ConfirmDialog
        open={Boolean(deleteId)}
        title="Delete Product?"
        description="Are you sure you want to delete this product? This action cannot be undone and will remove the item from all listings."
        confirmLabel="Delete"
        destructive
        onConfirm={handleDelete}
        onOpenChange={(open) => !open && setDeleteId(null)}
      />
    </div>
  );
}
