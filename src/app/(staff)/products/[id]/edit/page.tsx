'use client';

import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { LoadingState } from '@/components/common/loading-state';
import { EmptyState } from '@/components/common/empty-state';
import { ProductForm } from '@/features/products/components/product-form';
import { useManageProductQuery, useUpdateManageProductMutation } from '@/features/products/hooks';
import { toast } from 'sonner';

export default function EditProductPage() {
  const params = useParams<{ id: string }>();
  const productQuery = useManageProductQuery(params.id);
  const mutation = useUpdateManageProductMutation(params.id);

  if (productQuery.isLoading) return <LoadingState label="Loading product" />;
  if (!productQuery.data) return <EmptyState title="Product not found" actionLabel="Back" actionHref="/staff/products" />;

  return (
    <Card>
      <CardHeader><h1 className="text-2xl font-semibold">Edit product</h1></CardHeader>
      <CardContent>
        <ProductForm initialValues={productQuery.data} submitLabel="Update product" onSubmit={(values) => mutation.mutate(values, { onSuccess: () => toast.success('Product updated') })} />
      </CardContent>
    </Card>
  );
}
