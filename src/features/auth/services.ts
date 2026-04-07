import { api, apiRequest } from '@/lib/api/http';
import type { ApiResponse } from '@/lib/api/types';
import type { AuthSession } from '@/types/auth';
import type { LoginRequest, RegisterRequest } from '@/types/auth';

export async function login(request: LoginRequest) {
  const response = await api.post<ApiResponse<AuthSession>>('/api/auth/login', request);
  return apiRequest(Promise.resolve(response));
}

export async function register(request: RegisterRequest) {
  const response = await api.post<ApiResponse<AuthSession>>('/api/auth/register', request);
  return apiRequest(Promise.resolve(response));
}

export async function logout() {
  const response = await api.post<ApiResponse<null>>('/api/auth/logout');
  return apiRequest(Promise.resolve(response));
}

export async function fetchMe() {
  const response = await api.get<ApiResponse<AuthSession['user']>>('/api/me');
  return apiRequest(Promise.resolve(response));
}
