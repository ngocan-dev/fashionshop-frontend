import { api, apiRequest } from '@/lib/api/http';
import type { ApiListResponse, ApiResponse } from '@/lib/api/types';
import type { CheckoutSummary, CreateOrderRequest, Order, OrderFilter } from '@/types/order';
import type { Payment } from '@/types/payment';
import { mockOrders, getMockOrder } from '@/data/mock-data';

// TODO: Remove mock helpers once the real backend is available
const USE_MOCK = true;

export async function fetchCheckoutSummary() {
  const response = await api.get<ApiResponse<CheckoutSummary>>('/api/orders/checkout-summary');
  return apiRequest(Promise.resolve(response));
}

export async function updateCheckoutPaymentMethod(paymentMethod: string) {
  const response = await api.patch<ApiResponse<CheckoutSummary>>('/api/orders/checkout/payment-method', { paymentMethod });
  return apiRequest(Promise.resolve(response));
}

export async function createOrder(request: CreateOrderRequest) {
  const response = await api.post<ApiResponse<Order>>('/api/orders', request);
  return apiRequest(Promise.resolve(response));
}

export async function fetchMyOrders() {
  if (USE_MOCK) return mockOrders;
  const response = await api.get<ApiResponse<Order[]>>('/api/orders/my');
  return apiRequest(Promise.resolve(response));
}

export async function fetchMyOrderHistory() {
  if (USE_MOCK) return mockOrders;
  const response = await api.get<ApiResponse<Order[]>>('/api/orders/my/history');
  return apiRequest(Promise.resolve(response));
}

export async function fetchMyOrder(orderId: string) {
  const response = await api.get<ApiResponse<Order>>(`/api/orders/my/${orderId}`);
  return apiRequest(Promise.resolve(response));
}

export async function fetchMyOrderPayment(orderId: string) {
  const response = await api.get<ApiResponse<Payment>>(`/api/orders/my/${orderId}/payment`);
  return apiRequest(Promise.resolve(response));
}

export async function fetchMyOrderStatus(orderId: string) {
  const response = await api.get<ApiResponse<string>>(`/api/orders/my/${orderId}/status`);
  return apiRequest(Promise.resolve(response));
}

export async function cancelMyOrder(orderId: string) {
  const response = await api.patch<ApiResponse<Order>>(`/api/orders/my/${orderId}/cancel`);
  return apiRequest(Promise.resolve(response));
}

export async function fetchOrders() {
  const response = await api.get<ApiResponse<Order[]>>('/api/orders');
  return apiRequest(Promise.resolve(response));
}

export async function fetchManageOrders(filter?: OrderFilter) {
  if (USE_MOCK) {
    let filteredItems = [...mockOrders];

    if (filter?.keyword) {
      const k = filter.keyword.toLowerCase();
      filteredItems = filteredItems.filter(o => 
        o.orderNumber?.toLowerCase().includes(k) || 
        o.customerName?.toLowerCase().includes(k) ||
        o.id.toLowerCase().includes(k)
      );
    }

    if (filter?.status) {
      filteredItems = filteredItems.filter(o => o.status === filter.status);
    }

    const page = filter?.page ?? 0;
    const size = filter?.size ?? 10;
    const start = page * size;
    const paginatedItems = filteredItems.slice(start, start + size);

    return {
      items: paginatedItems,
      total: filteredItems.length,
      page,
      size,
    };
  }
  const response = await api.get<ApiResponse<ApiListResponse<Order>>>('/api/orders/manage', { params: filter });
  return apiRequest(Promise.resolve(response));
}

export async function fetchManageOrder(orderId: string) {
  if (USE_MOCK) return getMockOrder(orderId);
  const response = await api.get<ApiResponse<Order>>(`/api/orders/manage/${orderId}`);
  return apiRequest(Promise.resolve(response));
}

export async function fetchOrder(orderId: string) {
  const response = await api.get<ApiResponse<Order>>(`/api/orders/${orderId}`);
  return apiRequest(Promise.resolve(response));
}

export async function updateOrderStatus(orderId: string, status: string) {
  const response = await api.patch<ApiResponse<Order>>(`/api/orders/${orderId}/status`, { status });
  return apiRequest(Promise.resolve(response));
}

export async function updateManageOrderStatus(orderId: string, status: string) {
  if (USE_MOCK) {
    const index = mockOrders.findIndex(o => o.id === orderId);
    if (index !== -1) {
      mockOrders[index] = {
        ...mockOrders[index],
        status: status as any,
        activityLog: [
          {
            status: `Order ${status.toLowerCase()}`,
            timestamp: new Date().toLocaleString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              year: 'numeric', 
              hour: 'numeric', 
              minute: '2-digit' 
            }),
            isPrimary: true
          },
          ...(mockOrders[index].activityLog || []).map(log => ({ ...log, isPrimary: false }))
        ]
      };
      return mockOrders[index];
    }
  }
  const response = await api.patch<ApiResponse<Order>>(`/api/orders/manage/${orderId}/status`, { status });
  return apiRequest(Promise.resolve(response));
}
