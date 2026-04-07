import Link from 'next/link';

type EmptyStateProps = {
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  icon?: React.ReactNode;
};

export function EmptyState({ title, description, actionLabel, actionHref, icon }: EmptyStateProps) {
  return (
    <div className="rounded-3xl border border-dashed border-border bg-card px-6 py-14 text-center">
      {icon ? <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600">{icon}</div> : null}
      <h3 className="text-lg font-semibold">{title}</h3>
      {description ? <p className="mt-2 text-sm text-muted-foreground">{description}</p> : null}
      {actionHref && actionLabel ? (
        <Link href={actionHref} className="mt-6 inline-flex rounded-2xl bg-brand-600 px-4 py-2.5 text-sm font-medium text-white">
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
