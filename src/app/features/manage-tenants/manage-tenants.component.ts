import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TenantService } from '../../core/services/tenant.service';
import { Tenant } from '../../core/models/tenant';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-manage-tenants',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-tenants.component.html',
  styleUrls: ['./manage-tenants.component.css', '../styles/mastermanage-style.css']
})
export class ManageTenantsComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);

  tenants: Tenant[] = [];
  filteredTenants: Tenant[] = [];
  searchKeyword = '';
  isLoading = false;
  errorMessage = '';
  showDeleteConfirm = false;
  deleteTargetId: string | null = null;
  activeTenantId: string | null = null;

  constructor(
    private tenantService: TenantService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.activeTenantId = localStorage.getItem('tenantId');
      this.loadTenants();
    }
  }

  loadTenants(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.tenantService.getTenants().subscribe({
      next: (res) => {
        this.tenants = res;
        this.applyFilter();
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load tenants. Please try again.';
        this.isLoading = false;
        console.error('Load tenants error:', err);
      }
    });
  }

  applyFilter(): void {
    const kw = this.searchKeyword.toLowerCase().trim();
    if (!kw) {
      this.filteredTenants = [...this.tenants];
    } else {
      this.filteredTenants = this.tenants.filter(t =>
        t.name.toLowerCase().includes(kw) ||
        t.phone.includes(kw) ||
        t.email.toLowerCase().includes(kw)
      );
    }
  }

  get activeCount(): number {
    return this.tenants.filter(t => t.isActive).length;
  }

  get inactiveCount(): number {
    return this.tenants.filter(t => !t.isActive).length;
  }

  addTenant(): void {
    this.router.navigate(['/tenants/add-tenant']);
  }

  editTenant(id: string): void {
    const tenant = this.tenants.find(t => t.tenantId === id);
    this.router.navigate(['/tenants/add-tenant'], {
      queryParams: { id },
      state: { tenant }
    });
  }

  confirmDelete(id: string): void {
    this.deleteTargetId = id;
    this.showDeleteConfirm = true;
  }

  executeDelete(): void {
    if (this.deleteTargetId !== null) {
      this.tenantService.deleteTenant(this.deleteTargetId).subscribe({
        next: () => this.loadTenants()
      });
    }
    this.showDeleteConfirm = false;
    this.deleteTargetId = null;
  }

  cancelDelete(): void {
    this.showDeleteConfirm = false;
    this.deleteTargetId = null;
  }

  setActiveTenant(id: string): void {
    localStorage.setItem('tenantId', id);
    this.activeTenantId = id;
  }

  /** Build a full image URL from the relative path stored in the database. */
  getLogoUrl(relativePath: string): string {
    if (!relativePath) return '';
    if (relativePath.startsWith('http') || relativePath.startsWith('data:')) {
      return relativePath;
    }
    return `${environment.tenantServerUrl}${relativePath}`;
  }
}

