import { api, apiRequest } from '@/lib/api/http';
import type { ApiResponse } from '@/lib/api/types';
import type { AddCartItemRequest, Cart, UpdateCartItemRequest } from '@/types/cart';

export async function fetchCart() {
  const response = await api.get<ApiResponse<Cart>>('/api/cart');
  return apiRequest(Promise.resolve(response));
}

export async function fetchCartSummary() {
  const response = await api.get<ApiResponse<Cart>>('/api/cart/summary');
  return apiRequest(Promise.resolve(response));
}

export async function addCartItem(request: AddCartItemRequest) {
  const response = await api.post<ApiResponse<Cart>>('/api/cart/items', request);
  return apiRequest(Promise.resolve(response));
}

export async function updateCartItem(itemId: string, request: UpdateCartItemRequest) {
  const response = await api.put<ApiResponse<Cart>>(`/api/cart/items/${itemId}`, request);
  return apiRequest(Promise.resolve(response));
}

export async function updateCartItemQuantity(itemId: string, quantity: number) {
  const response = await api.put<ApiResponse<Cart>>(`/api/cart/items/${itemId}/quantity`, { quantity });
  return apiRequest(Promise.resolve(response));
}

export async function deleteCartItem(itemId: string) {
  const response = await api.delete<ApiResponse<Cart>>(`/api/cart/items/${itemId}`);
  return apiRequest(Promise.resolve(response));
}
