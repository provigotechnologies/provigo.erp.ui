import type { ApiResponse } from './customer';

export interface Branch {
  branchId: string;
  tenantId: string;
  branchName: string;
  address: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type { ApiResponse };

