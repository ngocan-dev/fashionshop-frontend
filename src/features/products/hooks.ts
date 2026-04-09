'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createProduct, deleteManageProduct, deleteProduct, fetchManageProduct, fetchManageProducts, fetchProduct, fetchProducts, fetchStoreProduct, fetchStoreProducts, searchProducts, updateManageProduct, updateProduct } from './services';
import { queryKeys } from '@/lib/api/query-keys';
import type { ProductFilter } from '@/types/product';

export function useProductsQuery() {
  return useQuery({ queryKey: queryKeys.products, queryFn: () => fetchProducts() });
}

export function useProductQuery(id: string) {
  return useQuery({ queryKey: queryKeys.product(id), queryFn: () => fetchProduct(id), enabled: Boolean(id) });
}

export function useProductSearchQuery(keyword: string) {
  return useQuery({ queryKey: [...queryKeys.products, 'search', keyword], queryFn: () => searchProducts(keyword), enabled: Boolean(keyword) });
}

export function useStoreProductsQuery(filter?: ProductFilter) {
  return useQuery({
    queryKey: [...queryKeys.storeProducts, filter?.keyword ?? '', filter?.categoryId ?? '', filter?.sortBy ?? ''],
    queryFn: () => fetchStoreProducts(filter),
  });
}

export function useStoreProductQuery(idOrSlug: string) {
  return useQuery({ queryKey: queryKeys.product(idOrSlug), queryFn: () => fetchStoreProduct(idOrSlug), enabled: Boolean(idOrSlug) });
}

export function useManageProductsQuery() {
  return useQuery({ queryKey: [...queryKeys.products, 'manage'], queryFn: fetchManageProducts });
}

export function useManageProductQuery(id: string) {
  return useQuery({ queryKey: [...queryKeys.products, 'manage', id], queryFn: () => fetchManageProduct(id), enabled: Boolean(id) });
}

export function useCreateProductMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.products });
      await queryClient.invalidateQueries({ queryKey: queryKeys.storeProducts });
    },
  });
}

export function useUpdateProductMutation(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: Parameters<typeof updateProduct>[1]) => updateProduct(id, request),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.product(id) });
      await queryClient.invalidateQueries({ queryKey: queryKeys.products });
    },
  });
}

export function useDeleteProductMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.products });
    },
  });
}

export function useUpdateManageProductMutation(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: Parameters<typeof updateManageProduct>[1]) => updateManageProduct(id, request),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [...queryKeys.products, 'manage'] });
    },
  });
}

export function useDeleteManageProductMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteManageProduct,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [...queryKeys.products, 'manage'] });
    },
  });
}
