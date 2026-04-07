import type { DashboardPayload } from '@/types/dashboard';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function DashboardView({ data }: { data: DashboardPayload }) {
  return (
    <div className="grid gap-6 xl:grid-cols-3">
      <Card className="xl:col-span-3">
        <CardHeader>
          <h2 className="text-lg font-semibold">Overview</h2>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              ['Sales', `$${data.summary.totalSales.toFixed(2)}`],
              ['Orders', String(data.summary.totalOrders)],
              ['Customers', String(data.summary.totalCustomers)],
              ['Products', String(data.summary.totalProducts)],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-border bg-muted/30 p-4">
                <div className="text-sm text-muted-foreground">{label}</div>
                <div className="mt-1 text-2xl font-semibold">{value}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card className="xl:col-span-2">
        <CardHeader>
          <h2 className="text-lg font-semibold">Sales by day</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.salesByDay.map((item) => (
              <div key={item.date} className="flex items-center justify-between rounded-2xl bg-muted/30 px-4 py-3">
                <span>{item.date}</span>
                <strong>${item.amount.toFixed(2)}</strong>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Top products</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.topProducts.map((item) => (
              <div key={item.productId} className="rounded-2xl bg-muted/30 p-4">
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-muted-foreground">Sold {item.sold}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
