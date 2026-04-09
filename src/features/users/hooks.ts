'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createStaffAccount, deleteAdminAccount, deleteAdminAccountByEmail, deleteAdminUser, fetchAdminCustomerAccounts, fetchAdminStaffAccounts, fetchMe, updateMe } from './services';
import { queryKeys } from '@/lib/api/query-keys';

export function useMeQuery() {
  return useQuery({ queryKey: queryKeys.me, queryFn: fetchMe });
}

export function useUpdateMeMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateMe,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.me });
    },
  });
}

export function useAdminStaffAccountsQuery() {
  return useQuery({ queryKey: ['admin', 'staff-accounts'], queryFn: fetchAdminStaffAccounts });
}

export function useAdminCustomerAccountsQuery() {
  return useQuery({ queryKey: ['admin', 'customer-accounts'], queryFn: fetchAdminCustomerAccounts });
}

export function useCreateStaffAccountMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createStaffAccount,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['admin', 'staff-accounts'] });
    },
  });
}

export function useDeleteAdminUserMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAdminUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['admin', 'staff-accounts'] });
      await queryClient.invalidateQueries({ queryKey: ['admin', 'customer-accounts'] });
    },
  });
}

export function useDeleteAdminAccountMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAdminAccount,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['admin', 'staff-accounts'] });
      await queryClient.invalidateQueries({ queryKey: ['admin', 'customer-accounts'] });
    },
  });
}

export function useDeleteAdminAccountByEmailMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAdminAccountByEmail,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['admin', 'staff-accounts'] });
      await queryClient.invalidateQueries({ queryKey: ['admin', 'customer-accounts'] });
    },
  });
}
