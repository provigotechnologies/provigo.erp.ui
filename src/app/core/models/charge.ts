import type { ApiResponse } from './customer';

export interface Charge {
  chargeId: number;
  tenantId: string;
  name: string;
  chargeType: string; // 'Flat' | 'Percentage'
  value: number;
  isActive: boolean;
}

export type { ApiResponse };

