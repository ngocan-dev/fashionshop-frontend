import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '18 Studio',
  description: 'Premium fashion e-commerce frontend scaffold',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-zinc-900">{children}</body>
    </html>
  );
}
