import type { ApiResponse } from './customer';

export interface Tenant {
  tenantId: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  logoUrl: string;
  isActive: boolean;
  createdOn: string;
}

export type { ApiResponse };

