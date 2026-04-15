import type { DashboardPayload } from '@/types/dashboard';
import { cn } from '@/lib/utils/cn';

export function DashboardView({ data, isLoading }: { data?: DashboardPayload; isLoading?: boolean }) {
  if (isLoading || !data) {
    return (
      <div className="space-y-12 animate-pulse">
        {/* Skeleton Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 shadow-sm h-32" />
          ))}
        </div>

        {/* Skeleton Middle Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/30 h-96" />
          <div className="lg:col-span-4 space-y-6">
             <div className="bg-secondary-container p-6 rounded-xl h-40" />
             <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 h-40" />
          </div>
        </div>
      </div>
    );
  }

  const metrics = [
    { label: 'Total Revenue', value: `$${data.summary.totalSales.toLocaleString()}`, icon: 'payments', trend: '+12.5%', color: 'text-green-600 bg-green-50' },
    { label: 'Total Orders', value: data.summary.totalOrders.toLocaleString(), icon: 'shopping_cart', trend: '+8.2%', color: 'text-green-600 bg-green-50' },
    { label: 'Active Products', value: data.summary.totalProducts.toLocaleString(), icon: 'inventory_2', trend: 'Stable', color: 'text-on-surface-variant bg-surface-container' },
    { label: 'Total Customers', value: data.summary.totalCustomers.toLocaleString(), icon: 'person_add', trend: '+18.1%', color: 'text-green-600 bg-green-50' },
  ];

  return (
    <div className="space-y-12">
      {/* Summary Cards Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <div key={metric.label} className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-surface-container rounded-lg">
                <span className="material-symbols-outlined text-primary">{metric.icon}</span>
              </div>
              <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full", metric.color)}>
                {metric.trend}
              </span>
            </div>
            <p className="text-on-surface-variant text-[10px] font-label tracking-widest uppercase mb-1">{metric.label}</p>
            <p className="text-2xl font-headline font-extrabold">{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Middle Section: Chart & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sales Trends Chart Area */}
        <div className="lg:col-span-8 bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/30">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="font-headline text-lg font-bold">Sales Trends</h3>
              <p className="text-xs text-on-surface-variant">Daily revenue performance for the selected period</p>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-primary rounded-full"></span>
                <span className="text-[10px] font-bold">Current</span>
              </div>
            </div>
          </div>
          
          {/* Mock/Simple Chart Visualization using salesByDay */}
          <div className="h-64 flex items-end justify-between gap-2 px-2">
            {data.salesByDay.slice(-12).map((item, i) => {
              const maxAmount = Math.max(...data.salesByDay.map(d => d.amount), 1);
              const height = (item.amount / maxAmount) * 100;
              return (
                <div key={item.date} className="flex-1 flex flex-col justify-end gap-1 group relative">
                  <div 
                    className="w-full bg-primary rounded-t transition-all duration-500 group-hover:opacity-80" 
                    style={{ height: `${Math.max(height, 5)}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      ${item.amount.toLocaleString()}
                    </div>
                  </div>
                  <span className="text-[8px] text-center mt-2 font-bold opacity-40 uppercase truncate">
                    {item.date.split('-').slice(1).join('/')}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Low Stock Alert */}
          <div className="bg-secondary-container p-6 rounded-xl relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-on-secondary-container font-bold mb-2">
                <span className="material-symbols-outlined text-sm">warning</span>
                <span className="text-xs uppercase tracking-widest font-label">Inventory Alert</span>
              </div>
              <h4 className="font-headline font-bold text-lg mb-4 text-on-secondary-container">Some products are running low in stock.</h4>
              <button className="text-xs font-bold underline underline-offset-4 decoration-2 text-on-secondary-container hover:opacity-70 transition-opacity">
                Restock Now
              </button>
            </div>
            <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-8xl opacity-10 rotate-12 text-on-secondary-container">
              inventory
            </span>
          </div>

          {/* Quick Actions List */}
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 flex-1">
            <h4 className="font-headline font-bold text-sm mb-6">Quick Actions</h4>
            <div className="space-y-3">
              {[
                { label: 'Add New Product', icon: 'add_circle' },
                { label: 'Create Discount Code', icon: 'loyalty' },
                { label: 'Update Shipping Methods', icon: 'local_shipping' },
              ].map((action) => (
                <button key={action.label} className="w-full flex justify-between items-center p-3 rounded-lg bg-surface hover:bg-surface-container transition-all group">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">{action.icon}</span>
                    <span className="text-xs font-medium">{action.label}</span>
                  </div>
                  <span className="material-symbols-outlined text-sm text-outline-variant">chevron_right</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Products Table (Instead of Recent Orders since we don't have that data in payload) */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 overflow-hidden">
        <div className="px-8 py-6 border-b border-surface-container flex justify-between items-center">
          <h3 className="font-headline text-lg font-bold">Top Performing Products</h3>
          <button className="text-xs font-bold text-primary hover:underline">View All Inventory</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low/50">
                <th className="px-8 py-4 text-[10px] font-label tracking-widest text-on-surface-variant uppercase">Product Name</th>
                <th className="px-8 py-4 text-[10px] font-label tracking-widest text-on-surface-variant uppercase">Product ID</th>
                <th className="px-8 py-4 text-[10px] font-label tracking-widest text-on-surface-variant uppercase">Sold Units</th>
                <th className="px-8 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {data.topProducts.map((product) => (
                <tr key={product.productId} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-[10px] font-bold">
                        {product.name.substring(0, 2).toUpperCase()}
                      </div>
                      <span className="text-xs font-medium">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-xs text-on-surface-variant font-mono">#{product.productId.slice(-8)}</td>
                  <td className="px-8 py-5 text-xs font-bold">{product.sold.toLocaleString()} units</td>
                  <td className="px-8 py-5 text-right">
                    <button className="text-outline hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-lg">more_horiz</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

