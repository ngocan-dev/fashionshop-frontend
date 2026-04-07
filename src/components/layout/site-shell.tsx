import { StorefrontHeader } from '@/components/layout/storefront-header';

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(255,123,48,0.11),_transparent_35%),linear-gradient(180deg,_#fffaf6_0%,_#fff_100%)]">
      <StorefrontHeader />
      <main>{children}</main>
    </div>
  );
}
