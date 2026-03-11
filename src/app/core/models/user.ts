import type { ApiResponse } from './customer';

export interface User {
    userId: string;
    tenantId: string;
    branchId: string;
    email: string;
    firstName: string;
    lastName: string;
    PasswordHash: string;
    phoneNumber: string;
    roleId: number;
    userCategory: string;
    isActive: boolean;
    createdat: string;
    updatedat: string;
}

export type { ApiResponse };
