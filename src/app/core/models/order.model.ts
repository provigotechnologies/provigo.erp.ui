export interface OrderDto {
  orderId: number;
  tenantId: string;
  branchId: string;
  customerId: string;

  orderDate: string;
  status: string;

  subTotal: number;
  discountTotal: number;
  taxTotal: number;
  grandTotal: number;

  createdAt: string;

  items: OrderItemDto[];
  taxes: OrderTaxDto[];
  discounts: OrderDiscountDto[];
  charges: OrderChargeDto[];
}

export interface OrderItemDto {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

export interface OrderTaxDto {
  taxName: string;
  amount: number;
}

export interface OrderDiscountDto {
  discountName: string;
  amount: number;
}

export interface OrderChargeDto {
  chargeName: string;
  amount: number;
}

/** Sent to PUT /api/orders/{orderId}/update-payment */
export interface OrderPaymentUpdateDto {
  paidAmount: number;
}

/** Sent to PUT /api/orders/{id} — only updatable fields (server manages orderId/status/createdAt/tenantId) */
export interface OrderUpdateDto {
  branchId:      string;
  customerId:    string;
  orderDate:     string;
  subTotal:      number;
  taxTotal:      number;
  discountTotal: number;
  grandTotal:    number;
  items:     OrderItemDto[];
  taxes:     OrderTaxDto[];
  discounts: OrderDiscountDto[];
  charges:   OrderChargeDto[];
}