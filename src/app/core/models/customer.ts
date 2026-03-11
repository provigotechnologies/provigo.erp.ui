export interface Customer {
  customerId: number;
  tenantId: string;
  fullName: string;
  phone: string;
  email: string;
  address: string;
  joinDate: string;
  isActive: boolean;
  branchId: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  pagination: {
    totalRecords: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  } | null;
  errors: any;
  meta: {
    requestId: string;
    timestamp: string;
  };
}
