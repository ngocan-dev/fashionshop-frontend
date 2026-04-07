'use client';

import { EmptyState } from '@/components/common/empty-state';
import { LoadingState } from '@/components/common/loading-state';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useMeQuery } from '@/features/users/hooks';
import { ProfileForm } from '@/features/users/components/profile-form';
import { useUpdateMeMutation } from '@/features/users/hooks';
import { toast } from 'sonner';

export default function AccountPage() {
  const meQuery = useMeQuery();
  const updateMutation = useUpdateMeMutation();

  if (meQuery.isLoading) return <LoadingState label="Loading account" />;
  if (!meQuery.data) return <EmptyState title="Account not found" description="Please log in again." actionLabel="Log in" actionHref="/login" />;

  return (
    <Card>
      <CardHeader>
        <h1 className="text-2xl font-semibold">Account</h1>
      </CardHeader>
      <CardContent>
        <div className="mb-6 grid gap-2 text-sm text-muted-foreground">
          <div>Email: {meQuery.data.email}</div>
          <div>Role: {meQuery.data.role}</div>
        </div>
        <ProfileForm
          user={meQuery.data}
          onSubmit={(values) => updateMutation.mutate(values, { onSuccess: () => toast.success('Profile updated') })}
        />
      </CardContent>
    </Card>
  );
}
