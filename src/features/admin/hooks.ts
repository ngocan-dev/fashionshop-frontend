'use client';

import { useDashboardQuery } from '@/features/dashboard/hooks';
import {
  useAdminCustomerAccountsQuery,
  useAdminStaffAccountsQuery,
  useCreateStaffAccountMutation,
  useDeleteAdminAccountByEmailMutation,
  useDeleteAdminAccountMutation,
  useDeleteAdminUserMutation,
} from '@/features/users/hooks';

export function useAdminDashboardQuery(from: string, to: string) {
  return useDashboardQuery(from, to);
}

export {
  useAdminCustomerAccountsQuery,
  useAdminStaffAccountsQuery,
  useCreateStaffAccountMutation,
  useDeleteAdminAccountByEmailMutation,
  useDeleteAdminAccountMutation,
  useDeleteAdminUserMutation,
};
