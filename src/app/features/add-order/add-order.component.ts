import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

import { OrderService } from '../../services/order.service';
import { CustomerService } from '../../core/services/customer.service';
import { ProductService } from '../../core/services/product.service';
import { TaxService } from '../../core/services/tax.service';
import { DiscountService } from '../../core/services/discount.service';
import { ChargeService } from '../../core/services/charge.service';
import { BranchService } from '../../core/services/branch.service';
import { PaymentService } from '../../core/services/payment.service';
import { environment } from '../../../environments/environment.development';

import { Customer } from '../../core/models/customer';
import { Product } from '../../core/models/product';
import { Tax } from '../../core/models/tax';
import { Discount } from '../../core/models/discount';
import { Charge } from '../../core/models/charge';
import { Branch } from '../../core/models/branch';
import { OrderUpdateDto } from '../../core/models/order.model';

@Component({
  selector: 'app-add-order',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

  customers: Customer[] = [];
  products: Product[] = [];
  taxes: Tax[] = [];
  discounts: Discount[] = [];
  charges: Charge[] = [];
  branches: Branch[] = [];

  successMessage = '';
  errorMessage = '';
  isLoading = false;
  submitted = false;

  orderForm!: FormGroup;

  /* ---- Edit mode ---- */
  isEditMode   = false;
  editOrderId: number | null = null;

  /* ---- Payment panel state ---- */
  showPaymentPanel = false;
  paymentMode = 'Offline';
  paymentModes = ['Offline', 'Online'];
  paidAmount = 0;
  paymentSuccess = '';
  paymentError = '';
  paymentLoading = false;
  paymentSubmitted = false;
  private savedBranchId = '';
  private savedOrderId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private customerService: CustomerService,
    private productService: ProductService,
    private taxService: TaxService,
    private discountService: DiscountService,
    private chargeService: ChargeService,
    private branchService: BranchService,
    private paymentService: PaymentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.loadBranches();

    // Load masters when branch changes (Add mode only — Edit mode loads via forkJoin)
    this.orderForm.get('branchId')?.valueChanges.subscribe(branchId => {
      if (!branchId) { this.products = []; this.customers = []; return; }
      this.branchService.setActiveBranchId(branchId);
      this.loadMasters(branchId);
    });

    // Detect edit mode via query param ?id=
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.isEditMode   = true;
        this.editOrderId  = +id;
        this.loadOrderForEdit(+id);
      }
    });
  }

  private loadOrderForEdit(id: number): void {
    this.isLoading = true;

    // Prefer the order already in router state (passed by manage-orders),
    // so we avoid a redundant GET /orders/{id} round-trip.
    const stateOrder = history.state?.order ?? null;

    if (stateOrder) {
      this.applyOrderToForm(stateOrder);
    } else {
      // Fallback: fetch from API (e.g. user navigated directly via URL)
      this.orderService.getOrderById(id).subscribe({
        next: (res: any) => this.applyOrderToForm(res?.data ?? res),
        error: () => {
          this.isLoading    = false;
          this.errorMessage = 'Failed to load order for editing.';
        }
      });
    }
  }

  private applyOrderToForm(order: any): void {
    const branchId: string = order.branchId;

    // Inform BranchService so downstream calls use the right branch
    this.branchService.setActiveBranchId(branchId);

    // Load all masters for this branch in parallel, then patch the form
    forkJoin({
      customers: this.customerService.getCustomers(branchId),
      products:  this.productService.getProducts(branchId),
      taxes:     this.taxService.getTaxes(),
      discounts: this.discountService.getDiscounts(),
      charges:   this.chargeService.getCharges()
    }).subscribe({
      next: masters => {
        this.isLoading  = false;
        this.customers  = masters.customers;
        this.products   = masters.products;
        this.taxes      = masters.taxes;
        this.discounts  = masters.discounts;
        this.charges    = masters.charges;

        // Patch scalar fields — suppress branchId valueChanges to avoid double master load
        this.orderForm.patchValue({
          branchId:   order.branchId,
          customerId: order.customerId,
          orderDate:  order.orderDate?.substring(0, 10)
        }, { emitEvent: false });

        // Rebuild items FormArray from order data
        this.items.clear();
        (order.items || []).forEach((item: any) => {
          this.items.push(this.fb.group({
            productId: [item.productId, Validators.required],
            quantity:  [item.quantity, [Validators.required, Validators.min(1)]],
            price:     [{ value: item.price, disabled: true }]
          }));
        });

        // Resolve taxes / discounts / charges: match by name → get IDs
        const taxIds = (order.taxes || [])
          .map((t: any) => masters.taxes.find(x => x.name === t.taxName)?.taxId)
          .filter((v: any): v is number => v !== undefined);

        const discountIds = (order.discounts || [])
          .map((d: any) => masters.discounts.find(x => x.name === d.discountName)?.discountId)
          .filter((v: any): v is number => v !== undefined);

        const chargeIds = (order.charges || [])
          .map((c: any) => masters.charges.find(x => x.name === c.chargeName)?.chargeId)
          .filter((v: any): v is number => v !== undefined);

        this.orderForm.patchValue({ taxes: taxIds, discounts: discountIds, charges: chargeIds });
      },
      error: () => {
        this.isLoading    = false;
        this.errorMessage = 'Failed to load masters for the selected branch.';
      }
    });
  }

  buildForm() {
    this.orderForm = this.fb.group({
      customerId: [null, Validators.required],
      branchId:   [null, Validators.required],
      orderDate:  [new Date().toISOString().substring(0, 10), Validators.required],
      items:      this.fb.array([]),
      taxes:      [[]],
      discounts:  [[]],
      charges:    [[]]
    });
    this.addItem();
  }

  loadBranches() {
    this.branchService.getBranches().subscribe(res => this.branches = res);
  }

  loadMasters(branchId: string) {
    this.customerService.getCustomers(branchId).subscribe(res => this.customers = res);
    this.productService.getProducts(branchId).subscribe(res => this.products = res);
    this.taxService.getTaxes().subscribe(res => this.taxes = res);
    this.discountService.getDiscounts().subscribe(res => this.discounts = res);
    this.chargeService.getCharges().subscribe(res => this.charges = res);
  }

  /* ---------------- Items ---------------- */

  get items(): FormArray {
    return this.orderForm.get('items') as FormArray;
  }

  addItem(): void {
    this.items.push(this.fb.group({
      productId: [null, Validators.required],
      quantity:  [1, [Validators.required, Validators.min(1)]],
      price:     [{ value: 0, disabled: true }]
    }));
  }

  removeItem(index: number) { this.items.removeAt(index); }

  onProductChange(index: number) {
    const item = this.items.at(index);
    const productId = item.get('productId')?.value;
    const product = this.products.find(p => p.productId === +productId);
    if (product) {
      item.get('price')?.setValue(product.totalFee);
    }
  }

  /* ---------------- Calculations ---------------- */

  get subTotal(): number {
    return this.items.controls.reduce((sum, item) => {
      const qty   = item.get('quantity')?.value || 0;
      const price = item.get('price')?.value    || 0;
      return sum + qty * price;
    }, 0);
  }

  get taxTotal(): number {
    const selected: number[] = this.orderForm.value.taxes || [];
    return selected.reduce((sum: number, id: number) => {
      const tax = this.taxes.find(t => t.taxId === +id);
      return tax ? sum + (this.subTotal * tax.rate) / 100 : sum;
    }, 0);
  }

  get discountTotal(): number {
    const selected: number[] = this.orderForm.value.discounts || [];
    return selected.reduce((sum: number, id: number) => {
      const d = this.discounts.find(x => x.discountId === +id);
      return d ? sum + d.value : sum;
    }, 0);
  }

  get chargeTotal(): number {
    const selected: number[] = this.orderForm.value.charges || [];
    return selected.reduce((sum: number, id: number) => {
      const c = this.charges.find(x => x.chargeId === +id);
      return c ? sum + c.value : sum;
    }, 0);
  }

  get grandTotal(): number {
    return this.subTotal + this.taxTotal + this.chargeTotal - this.discountTotal;
  }

  get balanceAmount(): number {
    return this.grandTotal - this.paidAmount;
  }

  /* ---------------- Helpers ---------------- */

  private buildPayload() {
    const raw = this.orderForm.getRawValue();

    // Items → add productName + line total
    const items = (raw.items as any[]).map(item => {
      const product = this.products.find(p => p.productId === +item.productId);
      return {
        productId:   +item.productId,
        productName: product?.productName ?? '',
        quantity:    item.quantity,
        price:       item.price,
        total:       item.quantity * item.price
      };
    });

    // Taxes → convert selected IDs → { taxName, amount }
    const taxes = ((raw.taxes as number[]) || [])
      .map(id => {
        const tax = this.taxes.find(t => t.taxId === +id);
        return tax
          ? { taxName: tax.name, amount: +(this.subTotal * tax.rate / 100).toFixed(2) }
          : null;
      })
      .filter((v): v is { taxName: string; amount: number } => v !== null);

    // Discounts → convert selected IDs → { discountName, amount }
    const discounts = ((raw.discounts as number[]) || [])
      .map(id => {
        const d = this.discounts.find(x => x.discountId === +id);
        return d ? { discountName: d.name, amount: d.value } : null;
      })
      .filter((v): v is { discountName: string; amount: number } => v !== null);

    // Charges → convert selected IDs → { chargeName, amount }
    const charges = ((raw.charges as number[]) || [])
      .map(id => {
        const c = this.charges.find(x => x.chargeId === +id);
        return c ? { chargeName: c.name, amount: c.value } : null;
      })
      .filter((v): v is { chargeName: string; amount: number } => v !== null);

    // Return OrderUpdateDto shape (tenantId is read by backend from auth provider, not body)
    const payload: OrderUpdateDto = {
      branchId:      raw.branchId,
      customerId:    raw.customerId,
      orderDate:     raw.orderDate,
      items,
      taxes,
      discounts,
      charges,
      subTotal:      this.subTotal,
      taxTotal:      this.taxTotal,
      discountTotal: this.discountTotal,
      grandTotal:    this.grandTotal
    };
    return payload;
  }

  /* ---------------- Save / Update (no payment) ---------------- */

  submit() {
    this.submitted = true;
    if (this.orderForm.invalid) return;

    this.isLoading      = true;
    this.successMessage = '';
    this.errorMessage   = '';

    if (this.isEditMode && this.editOrderId !== null) {
      // ── UPDATE ──
      this.orderService.updateOrder(this.editOrderId, this.buildPayload()).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/orders/manage-orders']);
        },
        error: () => {
          this.errorMessage = 'Failed to update order';
          this.isLoading    = false;
        }
      });
    } else {
      // ── CREATE ──
      this.orderService.createOrder(this.buildPayload()).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/orders/manage-orders']);
        },
        error: () => {
          this.errorMessage = 'Failed to create order';
          this.isLoading    = false;
        }
      });
    }
  }

  /* ---------------- Save & Pay ---------------- */

  saveAndPay() {
    this.submitted = true;
    if (this.orderForm.invalid) return;

    this.isLoading      = true;
    this.successMessage = '';
    this.errorMessage   = '';
    this.paymentError   = '';
    this.paymentSuccess = '';

    // Step 1: Save the order first to get the orderId
    this.orderService.createOrder(this.buildPayload()).subscribe({
      next: (orderRes: any) => {
        this.isLoading     = false;
        this.savedOrderId  = orderRes?.data?.orderId ?? orderRes?.orderId ?? null;
        this.savedBranchId = this.orderForm.get('branchId')?.value ?? '';
        this.paidAmount        = this.grandTotal;
        this.paymentMode       = 'Offline';   // always reset when panel opens
        this.paymentSubmitted  = false;       // reset payment validation state
        this.showPaymentPanel  = true;        // Step 2: open payment panel
      },
      error: () => {
        this.isLoading    = false;
        this.errorMessage = 'Failed to save order. Please try again.';
      }
    });
  }

  /* ---------------- Confirm Payment ---------------- */

  confirmPayment() {
    this.paymentSubmitted = true;
    if (this.paidAmount <= 0) return;

    this.paymentLoading = true;
    this.paymentError   = '';
    this.paymentSuccess = '';

    const navigateAfterSuccess = () => {
      this.paymentLoading = false;
      this.paymentSuccess = 'Payment recorded successfully!';
      setTimeout(() => this.router.navigate(['/orders/manage-orders']), 1200);
    };

    if (this.paymentMode === 'Online') {
      /* ── ONLINE ────────────────────────────────────────────────────────
         Order already saved with status Partial (savedOrderId set).
         Step 1: POST /paymentTransactions → backend creates Razorpay order,
                 returns razorpayOrderId.
         Step 2: Open Razorpay checkout with razorpayOrderId.
         Step 3: On Razorpay success → POST /paymentTransaction/verify
                 with the three Razorpay identifiers → backend sets Paid.
      ──────────────────────────────────────────────────────────────────── */
      const txDto = {
        orderId:  this.savedOrderId!,
        branchId: this.savedBranchId,
        amount:   this.paidAmount,
        currency: 'INR'
      };

      this.paymentService.createTransaction(txDto).subscribe({
        next: (txRes) => {
          // 🔍 DEBUG — remove after confirming correct field name
          console.log('[createTransaction] raw response:', txRes);

          // Pick whichever field the backend actually returns for the Razorpay order ID
          const razorpayOrderId: string =
            (txRes as any).razorpayOrderId  ??
            (txRes as any).RazorpayOrderId  ??
            (txRes as any).orderId          ??
            (txRes as any).id               ??
            '';

          console.log('[createTransaction] resolved razorpayOrderId:', razorpayOrderId);

          // Open Razorpay with the backend-created order ID
          this.paymentService.openRazorpayCheckout({
            amount:      this.paidAmount,
            name:        'Order Payment',
            description: 'Online order payment',
            orderId:     razorpayOrderId || undefined
          }).then(rzpResponse => {

            // Verify payment → backend marks order as Paid
            this.paymentService.verifyPayment({
              razorpay_payment_id: rzpResponse.razorpay_payment_id,
              razorpay_order_id:   rzpResponse.razorpay_order_id,
              razorpay_signature:  rzpResponse.razorpay_signature
            }).subscribe({
              next:  () => navigateAfterSuccess(),
              error: () => {
                this.paymentLoading = false;
                this.paymentError =
                  `Transaction recorded but verification failed. ` +
                  `Razorpay Ref: ${rzpResponse.razorpay_payment_id}. Please contact support.`;
              }
            });

          }).catch(reason => {
            this.paymentLoading = false;
            if (reason !== 'dismissed') {
              this.paymentError = 'Razorpay could not be loaded. Please try again.';
            }
          });
        },
        error: () => {
          this.paymentLoading = false;
          this.paymentError = 'Failed to initiate online payment. Please try again.';
        }
      });

    } else {
      /* ── OFFLINE ───────────────────────────────────────────────────────
         Order already saved with status Partial (savedOrderId set).
         POST /payments to record offline payment (backend sets Paid directly).
      ──────────────────────────────────────────────────────────────────── */
      const dto = {
        tenantId:      environment.tenantId,
        branchId:      this.savedBranchId,
        orderId:       this.savedOrderId!,
        totalAmount:   this.grandTotal,
        paidAmount:    this.paidAmount,
        balanceAmount: this.balanceAmount,
        mode:          'Offline',
        paymentStatus: this.balanceAmount <= 0 ? 'Paid' : 'Partial'
      };

      this.paymentService.createPayment(dto).subscribe({
        next:  () => navigateAfterSuccess(),
        error: () => {
          this.paymentLoading = false;
          this.paymentError = 'Order saved but payment record failed. Please retry.';
        }
      });
    }
  }

  closePaymentPanel() {
    this.showPaymentPanel = false;
    this.router.navigate(['/orders/manage-orders']);
  }

  cancel() {
    this.router.navigate(['/orders/manage-orders']);
  }
}