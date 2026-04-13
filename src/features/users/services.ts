import { api, apiRequest } from '@/lib/api/http';
import type { ApiResponse } from '@/lib/api/types';
import type { AuthUser } from '@/types/common';
import type { CustomerAccount, StaffAccount, UpdateProfileRequest } from '@/types/user';
import { mockUser, mockOrders } from '@/data/mock-data';

// TODO: Remove mock helpers once the real backend is available
const USE_MOCK = true;

export async function fetchUserProfile() {
  if (USE_MOCK) return mockUser;
  const response = await api.get<ApiResponse<AuthUser>>('/api/users/profile');
  return apiRequest(Promise.resolve(response));
}

export async function updateUserProfile(request: UpdateProfileRequest) {
  if (USE_MOCK) return { ...mockUser, ...request };
  const response = await api.put<ApiResponse<AuthUser>>('/api/users/profile', request);
  return apiRequest(Promise.resolve(response));
}

export async function fetchMeUser() {
  if (USE_MOCK) return mockUser;
  const response = await api.get<ApiResponse<AuthUser>>('/api/users/me');
  return apiRequest(Promise.resolve(response));
}

export async function fetchMe() {
  if (USE_MOCK) return mockUser;
  const response = await api.get<ApiResponse<AuthUser>>('/api/me');
  return apiRequest(Promise.resolve(response));
}

export async function updateMe(request: UpdateProfileRequest) {
  if (USE_MOCK) return { ...mockUser, ...request };
  const response = await api.put<ApiResponse<AuthUser>>('/api/me', request);
  return apiRequest(Promise.resolve(response));
}

export async function fetchMyOrders() {
  if (USE_MOCK) return mockOrders as unknown[];
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
