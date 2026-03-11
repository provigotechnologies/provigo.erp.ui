import type { ApiResponse } from './customer';

export interface PaymentTransaction {
  transactionId: number;
  paymentId: number;
  mode: string;         // 'Online' | 'Offline'
  amount: number;
  gatewayRef: string;
  status: string;
}

/** POST /paymentTransactions — request */
export interface PaymentTransactionRequestCreateDto {
  orderId:   number;
  branchId:  string;
  amount:    number;   // rupees
  currency?: string;   // default 'INR'
  receipt?:  string;
}

/** POST /paymentTransactions — response (Razorpay order created) */
export interface PaymentTransactionResponseCreateDto {
  razorpayOrderId: string;  // pass to Razorpay checkout as order_id
  amount:          number;
  currency:        string;
  receipt?:        string;
}

/** POST /paymentTransaction/verify — request
 *  Matches the C# VerifyPaymentTransactionRequestDto exactly.
 */
export interface VerifyPaymentTransactionRequestDto {
  razorpay_payment_id?: string;
  razorpay_order_id?:   string;
  razorpay_signature?:  string;
}

/** GET /payments/refunds — response. Matches C# RefundDto. */
export interface RefundDto {
  refundId:     number;
  paymentId:    number;
  refundAmount: number;
  reason:       string;
  status:       string;
  createdAt:    string;
}

/** POST /payments/refunds/online|offline — request. Matches C# RefundCreateDto. */
export interface RefundCreateDto {
  paymentId:    number;
  refundAmount: number;
  reason:       string;
  mode:         string;   // 'Online' | 'Offline'
}

export interface Payment {
  paymentId:     number;
  tenantId:      string;
  branchId:      string;
  orderId:       number;
  totalAmount:   number;
  paidAmount:    number;
  balanceAmount: number;
  paymentStatus: string;
  mode:          string;   // 'Online' | 'Offline'
  createdAt:     string;
  transactions:  PaymentTransaction[];
  refunds:       RefundDto[];
}

export type { ApiResponse };

