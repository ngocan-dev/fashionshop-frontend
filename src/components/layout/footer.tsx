import Link from 'next/link';

export interface FooterLinkItem {
  label: string;
  href?: string;
  external?: boolean;
}

export interface FooterLinkGroup {
  title: string;
  links: FooterLinkItem[];
}

interface FooterProps {
  brand?: string;
  copyright?: string;
  groups?: FooterLinkGroup[];
  className?: string;
  containerClassName?: string;
}

const defaultGroups: FooterLinkGroup[] = [
  {
    title: 'Services',
    links: [
      { label: 'Sustainability', href: '/policies#sustainability' },
      { label: 'Shipping & Returns', href: '/policies#shipping-returns' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/policies#privacy-policy' },
      { label: 'Terms of Service', href: '/policies#terms' },
    ],
  },
  {
    title: 'Help',
    links: [
      { label: 'Contact', href: '/policies#contact' },
      { label: 'FAQ', href: '/policies#faq' },
    ],
  },
];

export function Footer({
  brand = '18 Studio',
  copyright = '© 2026 18 STUDIO. ALL RIGHTS RESERVED.',
  groups = defaultGroups,
  className = 'border-t border-zinc-200 py-12 sm:py-16',
  containerClassName = 'grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-14',
}: FooterProps) {
  return (
    <footer className={className}>
      <div className={containerClassName}>
        <div className="space-y-4">
          <p className="text-2xl font-semibold tracking-tight text-zinc-900">{brand}</p>
          <p className="max-w-[18ch] text-[11px] uppercase tracking-[0.16em] text-zinc-500">{copyright}</p>
        </div>

        {groups.map((group) => (
          <div key={group.title} className="space-y-4">
            <h3 className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">{group.title}</h3>
            <ul className="space-y-3">
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href ?? '#'}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noreferrer' : undefined}
                    className="text-sm text-zinc-700 underline decoration-zinc-300 underline-offset-4 transition-colors hover:text-zinc-950"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}

export default Footer;
