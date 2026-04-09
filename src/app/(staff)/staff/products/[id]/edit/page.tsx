'use client';

import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { LoadingState } from '@/components/common/loading-state';
import { EmptyState } from '@/components/common/empty-state';
import { ProductForm } from '@/features/products/components/product-form';
import { useManageProductQuery, useUpdateManageProductMutation } from '@/features/products/hooks';
import { toast } from 'sonner';
import type { ParsedApiError } from '@/lib/api/errors';

export default function EditProductPage() {
  const params = useParams<{ id: string }>();
  const productQuery = useManageProductQuery(params.id);
  const mutation = useUpdateManageProductMutation(params.id);

  if (productQuery.isLoading) return <LoadingState label="Loading product" />;
  if (productQuery.isError) return <EmptyState title="Product unavailable" description="Unable to load this product." actionLabel="Back" actionHref="/staff/products" />;
  if (!productQuery.data) return <EmptyState title="Product not found" actionLabel="Back" actionHref="/staff/products" />;

  return (
    <Card>
      <CardHeader><h1 className="text-2xl font-semibold">Edit product</h1></CardHeader>
      <CardContent>
        <ProductForm
          initialValues={productQuery.data}
          submitLabel={mutation.isPending ? 'Updating product...' : 'Update product'}
          onSubmit={(values) =>
            mutation.mutate(values, {
              onSuccess: () => toast.success('Product updated'),
              onError: (error) => {
                const apiError = error as ParsedApiError;
                toast.error(apiError.message || 'Unable to update product');
              },
            })
          }
        />
      </CardContent>
    </Card>
  );
}
