import Link from 'next/link';
import { routePaths } from '@/lib/constants/routes';

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(255,123,48,0.11),_transparent_35%),linear-gradient(180deg,_#fffaf6_0%,_#fff_100%)]">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur">
        <div className="container-shell flex h-16 items-center justify-between gap-4">
          <Link href={routePaths.home} className="text-lg font-semibold tracking-tight text-foreground">
            FashionShop
          </Link>
          <nav className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href={routePaths.products}>Products</Link>
            <Link href={routePaths.login}>Log in</Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
