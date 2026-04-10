'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { AdminCreateStaffForm } from '@/features/users/components/admin-create-staff-form';
import { useCreateStaffAccountMutation } from '@/features/users/hooks';
import { toast } from 'sonner';

export default function CreateStaffAccountPage() {
  const router = useRouter();
  const mutation = useCreateStaffAccountMutation();

  return (
    <Card>
      <CardHeader><h1 className="text-2xl font-semibold">Create staff account</h1></CardHeader>
      <CardContent>
        <AdminCreateStaffForm onSubmit={(values) => mutation.mutate(values, { onSuccess: () => { toast.success('Staff account created'); router.push('/admin/staff-accounts'); } })} />
      </CardContent>
    </Card>
  );
}
