import type { ApiResponse } from './customer';

export interface Discount {
  discountId: number;
  tenantId: string;
  name: string;
  type: string; // 'Percentage' | 'Flat'
  value: number;
  isActive: boolean;
}

export type { ApiResponse };

