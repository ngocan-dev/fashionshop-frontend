'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut, Menu, ShoppingBag, Users, LayoutDashboard, Warehouse, Boxes } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { routePaths } from '@/lib/constants/routes';
import { clearSessionAndRedirect, useAuthSession } from '@/features/auth/store';

const navigationByRole = {
  STAFF: [
    { href: '/staff/products', label: 'Products', icon: Boxes },
    { href: '/staff/categories', label: 'Categories', icon: Warehouse },
    { href: '/staff/orders', label: 'Orders', icon: ShoppingBag },
  ],
  ADMIN: [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/staff-accounts', label: 'Staff', icon: Users },
    { href: '/admin/customers', label: 'Customers', icon: ShoppingBag },
  ],
} as const;

export function RoleShell({ role, children }: { role: 'STAFF' | 'ADMIN'; children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const session = useAuthSession();

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
            onClick={() => clearSessionAndRedirect(router)}
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
              <button type="button" className="rounded-full border border-border p-2" aria-label="Open navigation">
                <Menu className="h-4 w-4" />
              </button>
            </div>
          </header>
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
