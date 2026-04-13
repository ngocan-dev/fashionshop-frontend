import { api, apiRequest } from '@/lib/api/http';
import type { ApiResponse } from '@/lib/api/types';
import type { Product, ProductFilter, UpsertProductRequest } from '@/types/product';
import { allMockProducts } from '@/data/mock-data';

// TODO: Remove mock helpers once the real backend is available
const USE_MOCK = true;

export async function fetchProducts(filter?: ProductFilter) {
  const response = await api.get<ApiResponse<Product[]>>('/api/products', { params: filter });
  return apiRequest(Promise.resolve(response));
}

export async function fetchProduct(id: string) {
  const response = await api.get<ApiResponse<Product>>(`/api/products/${id}`);
  return apiRequest(Promise.resolve(response));
}

export async function searchProducts(keyword: string) {
  const response = await api.get<ApiResponse<Product[]>>('/api/products/search', { params: { keyword } });
  return apiRequest(Promise.resolve(response));
}

export async function createProduct(request: UpsertProductRequest) {
  const response = await api.post<ApiResponse<Product>>('/api/products', request);
  return apiRequest(Promise.resolve(response));
}

export async function updateProduct(id: string, request: UpsertProductRequest) {
  const response = await api.put<ApiResponse<Product>>(`/api/products/${id}`, request);
  return apiRequest(Promise.resolve(response));
}

export async function deleteProduct(id: string) {
  const response = await api.delete<ApiResponse<null>>(`/api/products/${id}`);
  return apiRequest(Promise.resolve(response));
}

export async function fetchManageProducts() {
  const response = await api.get<ApiResponse<Product[]>>('/api/products/manage');
  return apiRequest(Promise.resolve(response));
}

export async function fetchManageProduct(id: string) {
  const response = await api.get<ApiResponse<Product>>(`/api/products/manage/${id}`);
  return apiRequest(Promise.resolve(response));
}

export async function updateManageProduct(id: string, request: UpsertProductRequest) {
  const response = await api.put<ApiResponse<Product>>(`/api/products/manage/${id}`, request);
  return apiRequest(Promise.resolve(response));
}

export async function deleteManageProduct(id: string) {
  const response = await api.delete<ApiResponse<null>>(`/api/products/manage/${id}`);
  return apiRequest(Promise.resolve(response));
}

export async function fetchStoreProducts(filter?: ProductFilter) {
  const response = await api.get<ApiResponse<Product[]>>('/api/store/products', { params: filter });
  return apiRequest(Promise.resolve(response));
}

export async function fetchStoreProduct(idOrSlug: string) {
  if (USE_MOCK) {
    const found = allMockProducts.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
    if (!found) throw new Error('Product not found');
    return found;
  }
  const response = await api.get<ApiResponse<Product>>(`/api/store/products/${idOrSlug}`);
  return apiRequest(Promise.resolve(response));
}
