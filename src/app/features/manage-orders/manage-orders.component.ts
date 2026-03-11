import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { OrderDto } from '../../core/models/order.model';
import { BranchService } from '../../core/services/branch.service';
import { Branch } from '../../core/models/branch';

@Component({
  selector: 'app-manage-orders',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe, DecimalPipe],
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent implements OnInit {

  private platformId = inject(PLATFORM_ID);

  orders: OrderDto[] = [];
  filteredOrders: OrderDto[] = [];

  /* ---- Branch filter ---- */
  branches: Branch[] = [];
  selectedBranchId = '';

  /* ---- Search ---- */
  searchTerm = '';

  /* ---- Pagination ---- */
  currentPage  = 1;
  pageSize     = 10;
  totalCount   = 0;

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.totalCount / this.pageSize));
  }

  get pages(): number[] {
    const total = this.totalPages;
    const current = this.currentPage;
    // show at most 5 page buttons centred on current page
    const delta = 2;
    const start = Math.max(1, current - delta);
    const end   = Math.min(total, current + delta);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  /* ---- UI state ---- */
  isLoading    = false;
  errorMessage = '';

  showDeleteConfirm = false;
  deleteTargetId: number | null = null;

  constructor(
    private orderService: OrderService,
    private branchService: BranchService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadBranches();
    }
  }

  /* ---- Branches ---- */
  loadBranches(): void {
    this.branchService.getBranches().subscribe({
      next: (data) => {
        this.branches = data;
        // auto-select first active branch and load orders
        const first = data.find(b => b.isActive) ?? data[0];
        if (first) {
          this.selectedBranchId = first.branchId;
        }
        this.loadOrders();
      },
      error: () => {
        this.errorMessage = 'Failed to load branches.';
      }
    });
  }

  onBranchChange(): void {
    this.currentPage = 1;
    this.loadOrders();
  }

  /* ---- Orders ---- */
  loadOrders(): void {
    this.isLoading   = true;
    this.errorMessage = '';

    this.orderService.getOrders(
      this.currentPage,
      this.pageSize,
      true,
      this.selectedBranchId || undefined
    ).subscribe({
      next: (res: any) => {
        // handle both paged { data, totalCount } and plain array responses
        this.orders = Array.isArray(res) ? res : (res.data ?? []);

        const apiTotal = res.totalCount ?? res.total ?? res.count ?? null;
        if (apiTotal != null) {
          // API gave us the real total — use it
          this.totalCount = apiTotal;
        } else if (this.orders.length < this.pageSize) {
          // Fewer rows than a full page → this is the last page
          this.totalCount = (this.currentPage - 1) * this.pageSize + this.orders.length;
        } else {
          // Full page returned and no total from API → assume at least one more page
          this.totalCount = this.currentPage * this.pageSize + 1;
        }

        this.applySearch();
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load orders.';
        this.isLoading    = false;
        console.error('Load orders error:', err);
      }
    });
  }

  applySearch(): void {
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredOrders = !term
      ? [...this.orders]
      : this.orders.filter(o =>
          o.status.toLowerCase().includes(term) ||
          o.orderId.toString().includes(term)
        );
  }

  /* ---- Pagination ---- */
  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.currentPage) return;
    this.currentPage = page;
    this.loadOrders();
  }

  /* ---- Stats ---- */
  get completedCount(): number {
    return this.orders.filter(o => o.status === 'Completed').length;
  }

  get pendingCount(): number {
    return this.orders.filter(o => o.status === 'Pending').length;
  }

  /* ---- Navigation ---- */
  addOrder(): void {
    this.router.navigate(['/orders/add-order']);
  }

  editOrder(id: number): void {
    const order = this.orders.find(o => o.orderId === id);
    this.router.navigate(['/orders/add-order'], {
      queryParams: { id },
      state: { order }
    });
  }

  /* ---- Delete ---- */
  confirmDelete(id: number): void {
    this.deleteTargetId   = id;
    this.showDeleteConfirm = true;
  }

  executeDelete(): void {
    if (this.deleteTargetId === null) return;

    this.orderService.deleteOrder(this.deleteTargetId).subscribe({
      next: () => this.loadOrders(),
      error: () => {
        this.errorMessage = 'Failed to delete order.';
      }
    });

    this.cancelDelete();
  }

  cancelDelete(): void {
    this.showDeleteConfirm = false;
    this.deleteTargetId    = null;
  }
}