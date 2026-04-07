import { api, apiRequest } from '@/lib/api/http';
import type { ApiResponse } from '@/lib/api/types';
import type { WishlistItem } from '@/types/wishlist';

export async function fetchWishlist() {
  const response = await api.get<ApiResponse<WishlistItem[]>>('/api/wishlist');
  return apiRequest(Promise.resolve(response));
}

export async function checkWishlistContains(productId: string) {
  const response = await api.get<ApiResponse<boolean>>(`/api/wishlist/items/contains/${productId}`);
  return apiRequest(Promise.resolve(response));
}

export async function addWishlistItem(productId: string) {
  const response = await api.post<ApiResponse<WishlistItem[]>>('/api/wishlist/items', { productId });
  return apiRequest(Promise.resolve(response));
}

export async function deleteWishlistItem(productId: string) {
  const response = await api.delete<ApiResponse<WishlistItem[]>>(`/api/wishlist/items/${productId}`);
  return apiRequest(Promise.resolve(response));
}
