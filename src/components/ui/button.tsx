import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-2xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-brand-600 text-white shadow-sm hover:bg-brand-700',
        outline: 'border border-border bg-background hover:bg-muted',
        ghost: 'hover:bg-muted',
        destructive: 'bg-danger text-white hover:opacity-95',
      },
      size: {
        default: 'h-11 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-12 px-6',
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}
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
