'use client';

import Link from 'next/link';
import { AuthCard } from '@/features/auth/components/auth-card';
import { RegisterForm } from '@/features/auth/components/register-form';

export default function RegisterPage() {
  return (
    <div className="container-shell flex min-h-[calc(100vh-64px)] items-center justify-center py-10">
      <AuthCard title="Create account" description="Join FashionShop and start shopping immediately.">
        <RegisterForm />
        <p className="mt-4 text-sm text-muted-foreground">
          Already have an account? <Link href="/login" className="font-medium text-brand-700">Log in</Link>
        </p>
      </AuthCard>
    </div>
  );
}
