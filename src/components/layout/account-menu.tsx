'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { UserRound } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

type AccountMenuProps = {
  isLoggedIn: boolean;
  onLogout: () => void;
};

const menuItems = [
  { label: 'Profile', href: '/account' },
  { label: 'Cart', href: '/cart' },
  { label: 'Order', href: '/orders' },
] as const;

export function AccountMenu({ isLoggedIn, onLogout }: AccountMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (!isLoggedIn) {
    return (
      <Link
        href="/auth"
        aria-label="Open account"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
      >
        <UserRound className="h-4 w-4" />
      </Link>
    );
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-label="Open account menu"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        onClick={() => setIsOpen((current) => !current)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
      >
        <UserRound className="h-4 w-4" />
      </button>

      <div
        className={cn(
          'absolute right-0 top-[calc(100%+0.5rem)] z-50 min-w-[160px] border border-zinc-200 bg-white p-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.12)] transition',
          isOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0',
        )}
        role="menu"
      >
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            role="menuitem"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-900"
          >
            {item.label}
          </Link>
        ))}

        <button
          type="button"
          role="menuitem"
          onClick={() => {
            setIsOpen(false);
            onLogout();
          }}
          className="block w-full px-3 py-2 text-left text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-900"
        >
          Logout
        </button>
      </div>
    </div>
  );
}