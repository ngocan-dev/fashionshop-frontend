import { cn } from '@/lib/utils/cn';

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-2xl bg-muted', className)} {...props} />;
}
export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse bg-zinc-200 ${className}`} />;
}
