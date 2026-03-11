import type { ApiResponse } from './customer';

export interface Shift {
    shiftId: number;
    shiftName: string;
    isActive: boolean;
}

export type { ApiResponse };