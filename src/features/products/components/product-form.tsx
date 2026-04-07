'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/common/form-field';
import type { Product } from '@/types/product';
import type { UpsertProductRequest } from '@/types/product';
import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  slug: z.string().optional(),
  description: z.string().optional(),
  price: z.coerce.number().nonnegative(),
  compareAtPrice: z.coerce.number().optional(),
  stock: z.coerce.number().int().nonnegative(),
  categoryId: z.string().optional(),
  imageUrls: z.string().min(1, 'At least one image URL is required'),
  active: z.boolean().optional(),
});

export type ProductFormValues = z.infer<typeof productSchema>;

type ProductFormProps = {
  initialValues?: Product | null;
  onSubmit: (values: UpsertProductRequest) => void;
  submitLabel?: string;
};

export function ProductForm({ initialValues, onSubmit, submitLabel = 'Save product' }: ProductFormProps) {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: initialValues?.name ?? '',
      slug: initialValues?.slug ?? '',
      description: initialValues?.description ?? '',
      price: initialValues?.price ?? 0,
      compareAtPrice: initialValues?.compareAtPrice ?? undefined,
      stock: initialValues?.stock ?? 0,
      categoryId: initialValues?.categoryId ?? '',
      imageUrls: initialValues?.images.map((image) => image.url).join(', ') ?? '',
      active: initialValues?.active ?? true,
    },
  });

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit((values) => onSubmit({ ...values, imageUrls: values.imageUrls.split(',').map((value) => value.trim()).filter(Boolean) }))}>
      <FormField<ProductFormValues> label="Name" name="name" register={form.register} error={form.formState.errors.name} />
      <FormField<ProductFormValues> label="Slug" name="slug" register={form.register} error={form.formState.errors.slug} />
      <FormField<ProductFormValues> label="Description" name="description" register={form.register} error={form.formState.errors.description} textarea />
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField<ProductFormValues> label="Price" name="price" register={form.register} error={form.formState.errors.price} type="number" />
        <FormField<ProductFormValues> label="Compare at price" name="compareAtPrice" register={form.register} error={form.formState.errors.compareAtPrice} type="number" />
        <FormField<ProductFormValues> label="Stock" name="stock" register={form.register} error={form.formState.errors.stock} type="number" />
        <FormField<ProductFormValues> label="Category ID" name="categoryId" register={form.register} error={form.formState.errors.categoryId} />
      </div>
      <FormField<ProductFormValues> label="Image URLs (comma separated)" name="imageUrls" register={form.register} error={form.formState.errors.imageUrls} textarea />
      <Button type="submit" disabled={form.formState.isSubmitting}>
        {submitLabel}
      </Button>
    </form>
  );
}
