'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/common/form-field';
import type { CheckoutSummary } from '@/types/order';

const checkoutSchema = z.object({
  shippingAddress: z.string().min(5, 'Shipping address is required'),
  paymentMethod: z.enum(['COD', 'CARD', 'BANK_TRANSFER', 'E_WALLET']),
  note: z.string().optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export function CheckoutForm({ summary, onSubmit }: { summary: CheckoutSummary; onSubmit: (values: CheckoutFormValues) => void }) {
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { shippingAddress: '', paymentMethod: summary.paymentMethod, note: '' },
  });

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
      <FormField<CheckoutFormValues> label="Shipping address" name="shippingAddress" register={form.register} error={form.formState.errors.shippingAddress} textarea />
      <label className="block space-y-2">
        <span className="text-sm font-medium">Payment method</span>
        <select className="h-11 w-full rounded-2xl border border-input bg-background px-4" {...form.register('paymentMethod')}>
          <option value="COD">Cash on delivery</option>
          <option value="CARD">Card</option>
          <option value="BANK_TRANSFER">Bank transfer</option>
          <option value="E_WALLET">E-wallet</option>
        </select>
      </label>
      <FormField<CheckoutFormValues> label="Note" name="note" register={form.register} error={form.formState.errors.note} textarea />
      <Button type="submit">Place order</Button>
    </form>
  );
}
