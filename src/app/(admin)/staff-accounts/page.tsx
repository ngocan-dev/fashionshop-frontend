'use client';

import { useState } from 'react';
import { DataTable } from '@/components/common/data-table';
import { LoadingState } from '@/components/common/loading-state';
import { EmptyState } from '@/components/common/empty-state';
import { ConfirmDialog } from '@/components/common/confirm-dialog';
import { useAdminStaffAccountsQuery, useDeleteAdminAccountMutation } from '@/features/users/hooks';
import { toast } from 'sonner';
import type { ParsedApiError } from '@/lib/api/errors';

export default function AdminStaffAccountsPage() {
  const accountsQuery = useAdminStaffAccountsQuery();
  const deleteMutation = useDeleteAdminAccountMutation();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  if (accountsQuery.isLoading) return <LoadingState label="Loading staff accounts" />;
  if (accountsQuery.isError) return <EmptyState title="Staff accounts unavailable" description="Unable to load staff accounts." actionLabel="Retry" actionHref="/admin/staff-accounts" />;
  if (!accountsQuery.data || accountsQuery.data.length === 0) return <EmptyState title="No staff accounts" actionLabel="Create staff account" actionHref="/admin/staff-accounts/new" />;

  return (
    <>
      <DataTable
        data={accountsQuery.data}
        columns={[
          { header: 'Name', cell: (account) => account.fullName },
          { header: 'Email', cell: (account) => account.email },
          { header: 'Role', cell: (account) => account.role },
          { header: 'Delete', cell: (account) => <button className="text-danger disabled:opacity-50" disabled={deleteMutation.isPending} onClick={() => setDeleteId(account.id)}>Delete</button> },
        ]}
      />
      <ConfirmDialog
        open={Boolean(deleteId)}
        title="Delete staff account?"
        description="This action cannot be undone."
        destructive
        confirmLabel="Delete"
        onOpenChange={(open) => !open && setDeleteId(null)}
        onConfirm={() => {
          if (!deleteId) return;
          deleteMutation.mutate(deleteId, {
            onSuccess: () => toast.success('Account deleted'),
            onError: (error) => {
              const apiError = error as ParsedApiError;
              toast.error(apiError.message || 'Unable to delete account');
            },
          });
          setDeleteId(null);
        }}
      />
    </>
  );
}
