'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { AuthUser } from '@/types/common';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/common/form-field';

const profileSchema = z.object({
  fullName: z.string().min(2),
  phoneNumber: z.string().optional(),
  avatarUrl: z.string().url().optional().or(z.literal('')),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export function ProfileForm({ user, onSubmit }: { user: AuthUser; onSubmit: (values: ProfileFormValues) => void }) {
  const form = useForm<ProfileFormValues>({ resolver: zodResolver(profileSchema), defaultValues: { fullName: user.fullName, phoneNumber: user.phoneNumber ?? '', avatarUrl: user.avatarUrl ?? '' } });

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
      <FormField<ProfileFormValues> label="Full name" name="fullName" register={form.register} error={form.formState.errors.fullName} />
      <FormField<ProfileFormValues> label="Phone number" name="phoneNumber" register={form.register} error={form.formState.errors.phoneNumber} />
      <FormField<ProfileFormValues> label="Avatar URL" name="avatarUrl" register={form.register} error={form.formState.errors.avatarUrl} />
      <Button type="submit">Save changes</Button>
    </form>
  );
}
