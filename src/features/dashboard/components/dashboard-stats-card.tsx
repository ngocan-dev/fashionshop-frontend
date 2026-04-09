import type { ReactNode } from 'react';

type DashboardStatsCardProps = {
  label: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    direction: 'up' | 'down';
    percent: number;
  };
};

export function DashboardStatsCard({ label, value, icon, trend }: DashboardStatsCardProps) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm transition-colors hover:bg-muted/30">
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <div className="mt-3 flex items-baseline gap-2">
            <p className="text-3xl font-semibold tracking-tight">{value}</p>
            {trend ? (
              <span className={`text-xs font-medium ${trend.direction === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {trend.direction === 'up' ? '↑' : '↓'} {trend.percent}%
              </span>
            ) : null}
          </div>
        </div>
        {icon ? <div className="text-3xl opacity-20">{icon}</div> : null}
      </div>
    </div>
  );
}
