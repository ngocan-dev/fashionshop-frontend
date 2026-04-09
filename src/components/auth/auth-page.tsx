'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthTabs, type AuthTab } from './auth-tabs';
import { LoginForm, type LoginErrors, type LoginValues } from './login-form';
import { RegisterForm, type RegisterErrors, type RegisterValues } from './register-form';
import { useLoginMutation, useRegisterMutation } from '@/features/auth/hooks';
import { loginSchema, registerSchema } from '@/features/auth/schemas';
import { useAuthStore } from '@/features/auth/store';
import { redirectForRole } from '@/lib/auth/permissions';
import type { Role } from '@/lib/constants/roles';
import type { ParsedApiError } from '@/lib/api/errors';

type AuthPageProps = {
  initialTab?: AuthTab;
};

const initialLoginValues: LoginValues = {
  email: '',
  password: '',
};

const initialRegisterValues: RegisterValues = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export function AuthPage({ initialTab = 'login' }: AuthPageProps) {
  const router = useRouter();
  const setSession = useAuthStore((state) => state.setSession);
  const [activeTab, setActiveTab] = useState<AuthTab>(initialTab);
  const [loginValues, setLoginValues] = useState<LoginValues>(initialLoginValues);
  const [registerValues, setRegisterValues] = useState<RegisterValues>(initialRegisterValues);
  const [loginErrors, setLoginErrors] = useState<LoginErrors>({});
  const [registerErrors, setRegisterErrors] = useState<RegisterErrors>({});
  const [statusMessage, setStatusMessage] = useState('');
  const loginMutation = useLoginMutation();
  const registerMutation = useRegisterMutation();
  const showDevRoleLogin = process.env.NEXT_PUBLIC_ENABLE_DEV_ROLE_LOGIN !== 'false';

  function loginAsRole(role: Role) {
    const session = {
      accessToken: `dev-${role.toLowerCase()}-token`,
      refreshToken: 'dev-refresh-token',
      user: {
        id: `dev-${role.toLowerCase()}-user`,
        email: `${role.toLowerCase()}@local.dev`,
        fullName: `Dev ${role}`,
        role,
      },
    };

    setSession(session);
    router.replace(redirectForRole(role));
  }

  function submitLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parseResult = loginSchema.safeParse(loginValues);
    if (!parseResult.success) {
      setLoginErrors({
        email: parseResult.error.flatten().fieldErrors.email?.[0],
        password: parseResult.error.flatten().fieldErrors.password?.[0],
      });
      setStatusMessage('');
      return;
    }

    setLoginErrors({});
    setStatusMessage('');

    loginMutation.mutate(parseResult.data, {
      onError: (error) => {
        const apiError = error as ParsedApiError;
        setStatusMessage(apiError.message || 'Unable to log in. Please try again.');
      },
    });
  }

  function submitRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parseResult = registerSchema.safeParse(registerValues);
    if (!parseResult.success) {
      setRegisterErrors({
        fullName: parseResult.error.flatten().fieldErrors.fullName?.[0],
        email: parseResult.error.flatten().fieldErrors.email?.[0],
        password: parseResult.error.flatten().fieldErrors.password?.[0],
        confirmPassword: parseResult.error.flatten().fieldErrors.confirmPassword?.[0],
      });
      setStatusMessage('');
      return;
    }

    setRegisterErrors({});
    setStatusMessage('');

    registerMutation.mutate(parseResult.data, {
      onError: (error) => {
        const apiError = error as ParsedApiError;
        setStatusMessage(apiError.message || 'Unable to register. Please try again.');
      },
    });
  }

  return (
    <main className="min-h-screen bg-[#efefec] text-zinc-900 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(460px,520px)_minmax(0,1fr)]">
      <aside className="relative hidden overflow-hidden bg-[linear-gradient(180deg,rgba(34,34,34,0.08),rgba(34,34,34,0.22))] lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.55),transparent_38%),linear-gradient(180deg,rgba(232,232,232,0.9),rgba(196,196,196,0.82))]" />
        <div className="absolute inset-y-0 left-8 w-px bg-black/20" />
        <div className="absolute bottom-8 left-14 h-24 w-24 rounded-full border border-black/15" />
        <div className="absolute bottom-10 left-20 h-36 w-28 border border-black/10 bg-white/25 shadow-[0_0_120px_rgba(0,0,0,0.08)] backdrop-blur-sm" />
      </aside>

      <section className="flex items-center justify-center px-4 py-8 sm:px-8 lg:px-6 lg:py-10">
        <div className="w-full max-w-[420px] bg-white px-6 py-8 shadow-[0_18px_60px_rgba(0,0,0,0.08)] ring-1 ring-black/5 sm:px-10 sm:py-10">
          <div className="space-y-3 text-center">
            <h1 className="text-[clamp(3rem,8vw,4.75rem)] font-black leading-none tracking-[-0.06em] text-zinc-950">ACCOUNT</h1>
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.34em] text-zinc-400">Access your account</p>
          </div>

          <div className="mt-8">
            <AuthTabs activeTab={activeTab} onChange={(tab) => setActiveTab(tab)} />
          </div>

          <div className="mt-8">
            {activeTab === 'login' ? (
              <LoginForm
                values={loginValues}
                errors={loginErrors}
                onChange={(field, value) => setLoginValues((current) => ({ ...current, [field]: value }))}
                onSubmit={submitLogin}
                isSubmitting={loginMutation.isPending}
              />
            ) : (
              <RegisterForm
                values={registerValues}
                errors={registerErrors}
                onChange={(field, value) => setRegisterValues((current) => ({ ...current, [field]: value }))}
                onSubmit={submitRegister}
                isSubmitting={registerMutation.isPending}
              />
            )}
          </div>

          {showDevRoleLogin ? (
            <div className="mt-6 border-t border-zinc-200 pt-5">
              <p className="text-center text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-zinc-400">Quick Role Login</p>
              <p className="mt-1 text-center text-[0.62rem] font-medium uppercase tracking-[0.18em] text-zinc-300">Set NEXT_PUBLIC_ENABLE_DEV_ROLE_LOGIN=false to hide</p>
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
                <button
                  type="button"
                  onClick={() => loginAsRole('CUSTOMER')}
                  className="h-10 border border-zinc-300 bg-white px-3 text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-zinc-700 transition hover:border-zinc-500 hover:text-zinc-900"
                >
                  Customer
                </button>
                <button
                  type="button"
                  onClick={() => loginAsRole('STAFF')}
                  className="h-10 border border-zinc-300 bg-white px-3 text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-zinc-700 transition hover:border-zinc-500 hover:text-zinc-900"
                >
                  Staff
                </button>
                <button
                  type="button"
                  onClick={() => loginAsRole('ADMIN')}
                  className="h-10 border border-zinc-300 bg-white px-3 text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-zinc-700 transition hover:border-zinc-500 hover:text-zinc-900"
                >
                  Admin
                </button>
              </div>
            </div>
          ) : null}

          {statusMessage ? <p className="mt-5 text-center text-xs font-medium uppercase tracking-[0.14em] text-red-600">{statusMessage}</p> : null}
        </div>
      </section>

      <aside className="relative hidden overflow-hidden bg-[linear-gradient(180deg,rgba(24,24,24,0.98),rgba(60,60,60,0.86))] lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_30%,rgba(255,255,255,0.14),transparent_35%),radial-gradient(circle_at_50%_65%,rgba(255,255,255,0.06),transparent_28%)]" />
        <div className="absolute inset-x-14 top-10 h-80 rounded-[50%] border border-white/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.01))] blur-[0.5px]" />
        <div className="absolute inset-x-20 bottom-20 h-40 rounded-[48%] border border-white/5 bg-black/25" />
      </aside>
    </main>
  );
}