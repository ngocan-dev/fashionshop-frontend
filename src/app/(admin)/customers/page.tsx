'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { DataTable } from '@/components/common/data-table';
import { EmptyState } from '@/components/common/empty-state';
import { LoadingState } from '@/components/common/loading-state';
import { ConfirmDialog } from '@/components/common/confirm-dialog';
import { Button } from '@/components/ui/button';
import { useAdminCustomerAccountsQuery, useDeleteAdminAccountByEmailMutation, useDeleteAdminUserMutation } from '@/features/users/hooks';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField } from '@/components/common/form-field';
import { toast } from 'sonner';

const deleteByEmailSchema = z.object({ email: z.string().email() });
type DeleteByEmailFormValues = z.infer<typeof deleteByEmailSchema>;

export default function AdminCustomersPage() {
  const accountsQuery = useAdminCustomerAccountsQuery();
  const deleteMutation = useDeleteAdminUserMutation();
  const deleteByEmailMutation = useDeleteAdminAccountByEmailMutation();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const form = useForm<DeleteByEmailFormValues>({ resolver: zodResolver(deleteByEmailSchema), defaultValues: { email: '' } });

  if (accountsQuery.isLoading) return <LoadingState label="Loading customers" />;
  if (!accountsQuery.data || accountsQuery.data.length === 0) return <EmptyState title="No customers" />;

  return (
    <Card>
      <CardHeader><h1 className="text-2xl font-semibold">Customer accounts</h1></CardHeader>
      <CardContent className="space-y-6">
        <form className="flex flex-col gap-3 sm:flex-row" onSubmit={form.handleSubmit((values) => deleteByEmailMutation.mutate(values.email, { onSuccess: () => toast.success('Account deleted by email') }))}>
          <FormField<DeleteByEmailFormValues> label="Email" name="email" register={form.register} error={form.formState.errors.email} />
          <div className="flex items-end"><Button type="submit">Delete by email</Button></div>
        </form>
        <DataTable data={accountsQuery.data} columns={[{ header: 'Name', cell: (account) => account.fullName }, { header: 'Email', cell: (account) => account.email }, { header: 'Delete', cell: (account) => <button className="text-danger" onClick={() => setDeleteId(account.id)}>Delete</button> }]} />
      </CardContent>
      <ConfirmDialog
        open={Boolean(deleteId)}
        title="Delete customer account?"
        destructive
        onOpenChange={(open) => !open && setDeleteId(null)}
        onConfirm={() => {
          if (!deleteId) return;
          deleteMutation.mutate(deleteId, { onSuccess: () => toast.success('Customer deleted') });
          setDeleteId(null);
        }}
      />
    </Card>
  );
}
