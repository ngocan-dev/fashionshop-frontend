'use client';

import Link from 'next/link';
import { EmptyState } from '@/components/common/empty-state';
import { LoadingState } from '@/components/common/loading-state';
import { DataTable } from '@/components/common/data-table';
import { useDeleteManageProductMutation, useManageProductsQuery } from '@/features/products/hooks';

export default function StaffProductsPage() {
  const productsQuery = useManageProductsQuery();
  const deleteMutation = useDeleteManageProductMutation();

  if (productsQuery.isLoading) return <LoadingState label="Loading products" />;
  if (!productsQuery.data || productsQuery.data.length === 0) return <EmptyState title="No managed products" actionLabel="Create product" actionHref="/staff/products/new" />;

  return (
    <div className="space-y-4">
      <Link className="inline-flex rounded-2xl bg-brand-600 px-4 py-2.5 text-sm font-medium text-white" href="/staff/products/new">Create product</Link>
      <DataTable
        data={productsQuery.data}
        columns={[
          { header: 'Name', cell: (product) => product.name },
          { header: 'Stock', cell: (product) => product.stock },
          { header: 'Price', cell: (product) => `$${product.price.toFixed(2)}` },
          { header: 'Edit', cell: (product) => <Link className="text-brand-700" href={`/staff/products/${product.id}/edit`}>Edit</Link> },
          { header: 'Delete', cell: (product) => <button className="text-danger" onClick={() => deleteMutation.mutate(product.id)}>Delete</button> },
        ]}
      />
    </div>
  );
}
