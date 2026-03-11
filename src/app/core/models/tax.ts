import type { ApiResponse } from './customer';

export interface Tax {
  taxId: number;
  tenantId: string;
  name: string;
  rate: number;
  isActive: boolean;
}

export type { ApiResponse };

