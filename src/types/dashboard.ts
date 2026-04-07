export type DashboardSummary = {
  totalSales: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  from: string;
  to: string;
};

export type DashboardPayload = {
  summary: DashboardSummary;
  salesByDay: Array<{ date: string; amount: number }>;
  topProducts: Array<{ productId: string; name: string; sold: number }>;
};
