'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogIn, UserRound } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Policies', href: '/policies' },
] as const;

function isActivePath(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function StorefrontHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur">
      <div className="w-full px-2 sm:px-4">
        <div className="grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-3">
          <Link href="/" aria-label="Go to home" className="inline-flex items-center justify-self-start">
            <Image src="/images/logo.png" alt="FashionShop" width={170} height={38} priority className="h-8 w-auto sm:h-9" />
          </Link>

          <nav aria-label="Storefront primary" className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative pb-1 text-sm font-semibold uppercase tracking-wide text-foreground/80 transition-colors hover:text-foreground',
                    active && 'text-foreground after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-foreground after:content-[""]',
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center justify-self-end gap-1 sm:gap-2">
            <Link
              href="/login"
              aria-label="Login"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
            >
              <LogIn className="h-4 w-4" />
            </Link>
            <Link
              href="/account"
              aria-label="View Profile"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
            >
              <UserRound className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <nav aria-label="Storefront primary mobile" className="scrollbar-none flex items-center justify-center gap-5 overflow-x-auto pb-2 md:hidden">
          {navItems.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative whitespace-nowrap pb-1 text-xs font-semibold uppercase tracking-wide text-foreground/80 transition-colors hover:text-foreground',
                  active && 'text-foreground after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-foreground after:content-[""]',
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
