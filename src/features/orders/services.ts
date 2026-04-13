import { api, apiRequest } from '@/lib/api/http';
import type { ApiResponse } from '@/lib/api/types';
import type { CheckoutSummary, CreateOrderRequest, Order } from '@/types/order';
import type { Payment } from '@/types/payment';
import { mockOrders } from '@/data/mock-data';

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

export async function fetchManageOrders() {
  const response = await api.get<ApiResponse<Order[]>>('/api/orders/manage');
  return apiRequest(Promise.resolve(response));
}

export async function fetchManageOrder(orderId: string) {
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
  const response = await api.patch<ApiResponse<Order>>(`/api/orders/manage/${orderId}/status`, { status });
  return apiRequest(Promise.resolve(response));
}
