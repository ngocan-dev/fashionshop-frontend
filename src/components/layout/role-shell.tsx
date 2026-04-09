'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut, Menu, ShoppingBag, Users, LayoutDashboard, Warehouse, Boxes, X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { routePaths } from '@/lib/constants/routes';
import { useAuthSession } from '@/features/auth/store';
import { useLogoutMutation } from '@/features/auth/hooks';

const navigationByRole = {
  STAFF: [
    { href: '/staff/products', label: 'Products', icon: Boxes },
    { href: '/staff/categories', label: 'Categories', icon: Warehouse },
    { href: '/staff/orders', label: 'Orders', icon: ShoppingBag },
  ],
  ADMIN: [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/staff-accounts', label: 'Staff', icon: Users },
    { href: '/customers', label: 'Customers', icon: ShoppingBag },
  ],
} as const;

export function RoleShell({ role, children }: { role: 'STAFF' | 'ADMIN'; children: React.ReactNode }) {
  const pathname = usePathname();
  const session = useAuthSession();
  const logoutMutation = useLogoutMutation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 flex-col border-r border-border/70 bg-card/70 px-4 py-5 lg:flex">
          <Link href={routePaths.home} className="mb-8 text-xl font-semibold tracking-tight">
            FashionShop
          </Link>
          <div className="mb-6 rounded-2xl border border-border bg-brand-50 px-4 py-3 text-sm">
            <p className="font-medium text-foreground">{session.user?.fullName ?? 'Guest'}</p>
            <p className="text-muted-foreground">{role}</p>
          </div>
          <nav className="space-y-1">
            {navigationByRole[role].map((item) => {
              const Icon = item.icon;
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition-colors',
                    active ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/20' : 'text-foreground hover:bg-muted',
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <button
            type="button"
            className="mt-auto flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-foreground hover:bg-muted"
            onClick={() => logoutMutation.mutate()}
          >
            <LogOut className="h-4 w-4" />
            Log out
          </button>
        </aside>

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="sticky top-0 z-30 border-b border-border/70 bg-background/90 backdrop-blur lg:hidden">
            <div className="flex h-16 items-center justify-between px-4">
              <Link href={routePaths.home} className="font-semibold tracking-tight">
                FashionShop
              </Link>
              <button type="button" className="rounded-full border border-border p-2" aria-label="Open navigation" onClick={() => setMobileNavOpen(true)}>
                <Menu className="h-4 w-4" />
              </button>
            </div>
          </header>

          {mobileNavOpen ? (
            <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
              <button type="button" className="absolute inset-0 bg-black/40" aria-label="Close navigation" onClick={() => setMobileNavOpen(false)} />
              <aside className="absolute right-0 top-0 h-full w-72 border-l border-border bg-background p-4 shadow-xl">
                <div className="mb-6 flex items-center justify-between">
                  <p className="font-semibold tracking-tight">{role} Panel</p>
                  <button type="button" className="rounded-full border border-border p-2" aria-label="Close navigation" onClick={() => setMobileNavOpen(false)}>
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="mb-5 rounded-2xl border border-border bg-brand-50 px-4 py-3 text-sm">
                  <p className="font-medium text-foreground">{session.user?.fullName ?? 'Guest'}</p>
                  <p className="text-muted-foreground">{role}</p>
                </div>
                <nav className="space-y-1">
                  {navigationByRole[role].map((item) => {
                    const Icon = item.icon;
                    const active = pathname.startsWith(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileNavOpen(false)}
                        className={cn(
                          'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition-colors',
                          active ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/20' : 'text-foreground hover:bg-muted',
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>
                <button
                  type="button"
                  className="mt-6 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm text-foreground hover:bg-muted"
                  onClick={() => {
                    setMobileNavOpen(false);
                    logoutMutation.mutate();
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  Log out
                </button>
              </aside>
            </div>
          ) : null}

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
