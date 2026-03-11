import type { ApiResponse } from './customer';

export interface Product {
  productId: number;
  tenantId: string;
  branchId: string;
  productName: string;
  totalFee: number;
  isActive: boolean;
  createdOn: string;
}

export type { ApiResponse };

