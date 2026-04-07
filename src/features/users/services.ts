import { api, apiRequest } from '@/lib/api/http';
import type { ApiResponse } from '@/lib/api/types';
import type { AuthUser } from '@/types/common';
import type { CustomerAccount, StaffAccount, UpdateProfileRequest } from '@/types/user';

export async function fetchUserProfile() {
  const response = await api.get<ApiResponse<AuthUser>>('/api/users/profile');
  return apiRequest(Promise.resolve(response));
}

export async function updateUserProfile(request: UpdateProfileRequest) {
  const response = await api.put<ApiResponse<AuthUser>>('/api/users/profile', request);
  return apiRequest(Promise.resolve(response));
}

export async function fetchMeUser() {
  const response = await api.get<ApiResponse<AuthUser>>('/api/users/me');
  return apiRequest(Promise.resolve(response));
}

export async function fetchMe() {
  const response = await api.get<ApiResponse<AuthUser>>('/api/me');
  return apiRequest(Promise.resolve(response));
}

export async function updateMe(request: UpdateProfileRequest) {
  const response = await api.put<ApiResponse<AuthUser>>('/api/me', request);
  return apiRequest(Promise.resolve(response));
}

export async function fetchMyOrders() {
  const response = await api.get<ApiResponse<unknown[]>>('/api/me/orders');
  return apiRequest(Promise.resolve(response));
}

export async function createStaffAccount(request: { fullName: string; email: string; password: string; role?: string }) {
  const response = await api.post<ApiResponse<StaffAccount>>('/api/admin/users/staff', request);
  return apiRequest(Promise.resolve(response));
}

export async function fetchStaffAccounts() {
  const response = await api.get<ApiResponse<StaffAccount[]>>('/api/admin/users/staff');
  return apiRequest(Promise.resolve(response));
}

export async function fetchCustomerAccounts() {
  const response = await api.get<ApiResponse<CustomerAccount[]>>('/api/admin/users/customers');
  return apiRequest(Promise.resolve(response));
}

export async function deleteAdminUser(userId: string) {
  const response = await api.delete<ApiResponse<null>>(`/api/admin/users/${userId}`);
  return apiRequest(Promise.resolve(response));
}

export async function fetchAdminStaffAccounts() {
  const response = await api.get<ApiResponse<StaffAccount[]>>('/api/admin/staff-accounts');
  return apiRequest(Promise.resolve(response));
}

export async function fetchAdminCustomerAccounts() {
  const response = await api.get<ApiResponse<CustomerAccount[]>>('/api/admin/customer-accounts');
  return apiRequest(Promise.resolve(response));
}

export async function deleteAdminAccount(id: string) {
  const response = await api.delete<ApiResponse<null>>(`/api/admin/accounts/${id}`);
  return apiRequest(Promise.resolve(response));
}

export async function deleteAdminAccountByEmail(email: string) {
  const response = await api.delete<ApiResponse<null>>('/api/admin/accounts/by-email', { params: { email } });
  return apiRequest(Promise.resolve(response));
}
