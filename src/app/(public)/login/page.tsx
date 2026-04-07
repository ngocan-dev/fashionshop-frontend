'use client';

import Link from 'next/link';
import { AuthCard } from '@/features/auth/components/auth-card';
import { LoginForm } from '@/features/auth/components/login-form';

export default function LoginPage() {
  return (
    <div className="container-shell flex min-h-[calc(100vh-64px)] items-center justify-center py-10">
      <AuthCard title="Log in" description="Access your customer, staff, or admin workspace.">
        <LoginForm />
        <p className="mt-4 text-sm text-muted-foreground">
          No account yet? <Link href="/register" className="font-medium text-brand-700">Register</Link>
        </p>
      </AuthCard>
    </div>
  );
}
