import type { AuthUser } from './common';

export type UpdateProfileRequest = {
  fullName: string;
  phoneNumber?: string;
  avatarUrl?: string;
};

export type StaffAccount = AuthUser & {
  department?: string;
};

export type CustomerAccount = AuthUser & {
  loyaltyPoints?: number;
};
