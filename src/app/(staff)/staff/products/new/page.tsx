'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ProductForm } from '@/features/products/components/product-form';
import { useCreateProductMutation } from '@/features/products/hooks';
import { toast } from 'sonner';

export default function CreateProductPage() {
  const router = useRouter();
  const mutation = useCreateProductMutation();

  return (
    <Card>
      <CardHeader><h1 className="text-2xl font-semibold">Create product</h1></CardHeader>
      <CardContent>
        <ProductForm onSubmit={(values) => mutation.mutate(values, { onSuccess: () => { toast.success('Product created'); router.push('/staff/products'); } })} />
      </CardContent>
    </Card>
  );
}
