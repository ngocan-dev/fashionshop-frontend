import type { DashboardPayload } from '@/types/dashboard';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function DashboardView({ data }: { data: DashboardPayload }) {
  return (
    <div className="grid gap-6">
      {data.salesByDay.length > 0 ? (
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Sales by day</h2>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {data.salesByDay.map((item) => (
                <div key={item.date} className="flex flex-col rounded-2xl border border-border bg-card p-4">
                  <span className="text-sm text-muted-foreground">{item.date}</span>
                  <p className="mt-2 text-2xl font-semibold">${item.amount.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : null}

      {data.topProducts.length > 0 ? (
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Top products</h2>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {data.topProducts.map((item) => (
                <div key={item.productId} className="rounded-2xl border border-border bg-muted/30 p-4">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Sold {item.sold}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
