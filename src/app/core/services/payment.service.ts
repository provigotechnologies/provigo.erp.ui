import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Payment, ApiResponse,
  PaymentTransactionRequestCreateDto,
  PaymentTransactionResponseCreateDto,
  VerifyPaymentTransactionRequestDto,
  RefundDto,
  RefundCreateDto
} from '../models/payment';
import { environment } from '../../../environments/environment.development';

export interface RazorpayOptions {
  amount: number;         // rupees — service converts to paise internally
  currency?: string;      // default 'INR'
  name?: string;
  description?: string;
  orderId?: string;       // Razorpay order ID from your backend (optional)
  prefill?: { name?: string; email?: string; contact?: string };
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id:   string;
  razorpay_signature:  string;
}

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private paymentsUrl     = `${environment.paymentApiUrl}/payments`;
  private refundsUrl      = `${environment.paymentApiUrl}/payments/refunds`;
  private transactionsUrl = `${environment.paymentApiUrl}/paymentTransactions`;
  private verifyUrl       = `${environment.paymentApiUrl}/paymentTransaction/verify`;

  constructor(private http: HttpClient) {}

  /* -------- REST -------- */

  /** Offline mode — POST /payments */
  createPayment(dto: Partial<Payment>): Observable<ApiResponse<Payment>> {
    return this.http.post<ApiResponse<Payment>>(this.paymentsUrl, dto);
  }

  /**
   * Online mode — POST /paymentTransactions
   * Creates a Razorpay order on the backend.
   * Returns a response containing razorpayOrderId to pass to the Razorpay checkout.
   */
  createTransaction(dto: PaymentTransactionRequestCreateDto): Observable<PaymentTransactionResponseCreateDto> {
    return this.http.post<PaymentTransactionResponseCreateDto>(this.transactionsUrl, dto);
  }

  getPaymentByOrder(orderId: number): Observable<ApiResponse<Payment>> {
    return this.http.get<ApiResponse<Payment>>(`${this.paymentsUrl}/order/${orderId}`);
  }

  /**
   * Verify Razorpay payment — POST /paymentTransaction/verify
   * Called after Razorpay checkout succeeds to confirm payment and mark order Paid.
   */
  verifyPayment(dto: VerifyPaymentTransactionRequestDto): Observable<boolean> {
    return this.http.post<boolean>(this.verifyUrl, dto);
  }

  /* -------- Refunds -------- */

  /**
   * Online refund — POST /payments/refunds/online
   * Creates a Razorpay refund on the backend.
   */
  createOnlineRefund(dto: RefundCreateDto): Observable<ApiResponse<RefundDto>> {
    return this.http.post<ApiResponse<RefundDto>>(`${this.refundsUrl}/online`, dto);
  }

  /**
   * Verify online refund — POST /payments/refunds/verify?gatewayRefundId=xxx
   * Confirms the Razorpay refund was processed successfully.
   */
  verifyOnlineRefund(gatewayRefundId: string): Observable<{ status: string }> {
    return this.http.post<{ status: string }>(
      `${this.refundsUrl}/verify`,
      null,
      { params: { gatewayRefundId } }
    );
  }

  /**
   * Offline refund — POST /payments/refunds/offline
   * Records a manual (cash/bank) refund directly.
   */
  createOfflineRefund(dto: RefundCreateDto): Observable<ApiResponse<RefundDto>> {
    return this.http.post<ApiResponse<RefundDto>>(`${this.refundsUrl}/offline`, dto);
  }

  /* -------- Razorpay -------- */
  
  async openRazorpayCheckout(options: RazorpayOptions): Promise<RazorpayResponse> {
    await this.loadRazorpayScript();
    return new Promise<RazorpayResponse>((resolve, reject) => {
      const rzp = new (window as any)['Razorpay']({
        key:         environment.razorpayKeyId,
        amount:      options.amount * 100,          // paise
        currency:    options.currency ?? 'INR',
        name:        options.name        ?? 'Payment',
        description: options.description ?? '',
        order_id:    options.orderId,
        prefill:     options.prefill ?? {},
        theme:       { color: '#00695c' },
        handler:     (response: RazorpayResponse) => resolve(response),
        modal:       { ondismiss: () => reject('dismissed') }
      });
      rzp.open();
    });
  }

  private loadRazorpayScript(): Promise<void> {
    const SCRIPT_ID = 'razorpay-checkout-js';
    if (document.getElementById(SCRIPT_ID)) {
      return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
      const script    = document.createElement('script');
      script.id       = SCRIPT_ID;
      script.src      = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload   = () => resolve();
      script.onerror  = () => reject(new Error('Failed to load Razorpay SDK'));
      document.body.appendChild(script);
    });
  }
}

