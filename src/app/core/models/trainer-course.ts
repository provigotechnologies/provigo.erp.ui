import type { ApiResponse } from './customer';
import { User } from './user';
import { Product } from './product';

export interface TrainerCourse {
    trainerCourseId: number;
    tenantId: string;
    branchId: string;
    trainerId: string;
    ProductId: number;
    isActive: boolean;

    trainer?: User;
    product?: Product;
}

export type { ApiResponse }