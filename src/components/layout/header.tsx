import Link from 'next/link';
import { SiteHeader } from '@/components/layout/siteheader';

const navItems = [
  { label: 'HOME', href: '/', active: true },
  { label: 'SHOP', href: '/product' },
  { label: 'ABOUT', href: '/about' },
  { label: 'POLICIES', href: '/policies' },
];

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16L21 21" />
    </svg>
  );
}

function AccountIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5 19.2C6.5 16.8 9 15.5 12 15.5C15 15.5 17.5 16.8 19 19.2" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="5.5" y="8" width="13" height="11" rx="1.5" />
      <path d="M9 8V7a3 3 0 0 1 6 0v1" />
    </svg>
  );
}

export function Header() {
  return (
    <SiteHeader
      className="sticky top-0 z-40 border-b border-zinc-200/80 bg-zinc-50/95 backdrop-blur"
      containerClassName="mx-auto flex h-20 w-full max-w-[1440px] items-center justify-between px-6 md:px-8 xl:px-12"
      brand={
        <Link href="/" className="text-3xl font-black uppercase tracking-tight text-zinc-900">
          18 STUDIO
        </Link>
      }
      navItems={navItems}
      navClassName="hidden items-center gap-8 text-xs font-semibold tracking-[0.14em] md:flex"
      activeClassName="border-b border-zinc-900 pb-1 text-zinc-900"
      inactiveClassName="text-zinc-500 hover:text-zinc-900"
      actions={
        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/search" aria-label="Search" className="rounded-sm p-2 text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-950">
            <SearchIcon />
          </Link>
          <Link href="/account" aria-label="Account" className="rounded-sm p-2 text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-950">
            <AccountIcon />
          </Link>
          <Link href="/cart" aria-label="Bag" className="rounded-sm p-2 text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-950">
            <BagIcon />
          </Link>
        </div>
      }
    />
  );
}