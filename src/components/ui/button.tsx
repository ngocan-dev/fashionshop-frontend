import Link from 'next/link';
import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  href?: string;
  className?: string;
} & Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'onClick' | 'disabled'>;

const variants = {
  primary: 'bg-black text-white hover:bg-zinc-800',
  secondary: 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200',
  ghost: 'bg-transparent text-zinc-900 hover:bg-zinc-100 border border-zinc-300',
};

export function Button({ children, variant = 'primary', href, className = '', type = 'button', onClick, disabled }: ButtonProps) {
  const base = `inline-flex items-center justify-center px-5 py-3 text-sm font-medium tracking-wide transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:opacity-50 ${variants[variant]} ${className}`;

  if (href) return <Link href={href} className={base}>{children}</Link>;
  return <button type={type} onClick={onClick} disabled={disabled} className={base}>{children}</button>;
}
