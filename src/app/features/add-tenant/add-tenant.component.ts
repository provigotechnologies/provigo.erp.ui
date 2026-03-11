import { Component, OnInit, ViewChild, ElementRef, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap, of } from 'rxjs';
import { TenantService } from '../../core/services/tenant.service';
import { Tenant } from '../../core/models/tenant';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-add-tenant',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-tenant.component.html',
  styleUrls: ['./add-tenant.component.css', '../styles/masters-style.css']
})
export class AddTenantComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);

  @ViewChild('logoInput') logoInput!: ElementRef<HTMLInputElement>;

  tenantForm: FormGroup;
  isEditMode = false;
  editTenantId: string | null = null;
  submitted = false;
  successMessage = '';
  errorMessage = '';
  isLoading = false;
  logoPreview = '';
  selectedLogoFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private tenantService: TenantService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.tenantForm = this.fb.group({
      name:    ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[A-Za-z0-9 .&\'-]+$')]],
      phone:   ['', [Validators.required, Validators.pattern('^[6-9][0-9]{9}$')]],
      email:   ['', [Validators.required, this.emailValidator]],
      address: [''],
      isActive: [true]
    });
  }

  emailValidator(control: any) {
    const value = control.value?.trim();
    if (!value) return null;
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.(com|in|org|net|edu)$/;
    if (!regex.test(value) || value.includes('..')) return { invalidEmail: true };
    return null;
  }

  /** Allow only numeric key presses in phone fields */
  onlyDigits(event: KeyboardEvent): boolean {
    return /[0-9]/.test(event.key);
  }

  /** Trim whitespace from a form field on blur */
  trimField(controlName: string): void {
    const ctrl = this.tenantForm.get(controlName);
    if (ctrl) ctrl.setValue(ctrl.value?.trim() ?? '');
  }

  ngOnInit(): void {
    const id = this.route.snapshot.queryParams['id'];
    if (id) {
      this.isEditMode = true;
      this.editTenantId = id;

      const navState = history.state;
      if (navState?.tenant) {
        this.patchForm(navState.tenant);
      } else {
        this.loadTenant(this.editTenantId!);
      }
    }
  }

  private patchForm(t: Tenant): void {
    this.tenantForm.patchValue({
      name: t.name,
      phone: t.phone,
      email: t.email,
      address: t.address,
      isActive: t.isActive
    });
    // Build full URL for preview if the stored path is relative
    if (t.logoUrl) {
      this.logoPreview = t.logoUrl.startsWith('http')
        ? t.logoUrl
        : `${environment.tenantServerUrl}${t.logoUrl}`;
    } else {
      this.logoPreview = '';
    }
  }

  triggerLogoInput(): void {
    this.logoInput.nativeElement.click();
  }

  onLogoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    this.selectedLogoFile = file;
    // Use FileReader only for the live preview — do not send base64 to the API
    const reader = new FileReader();
    reader.onload = () => {
      this.logoPreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  removeLogo(): void {
    this.logoPreview = '';
    this.selectedLogoFile = null;
    if (isPlatformBrowser(this.platformId) && this.logoInput?.nativeElement) {
      this.logoInput.nativeElement.value = '';
    }
  }

  loadTenant(id: string): void {
    this.isLoading = true;
    this.tenantService.getTenants().subscribe({
      next: (tenants) => {
        const t = tenants.find(x => x.tenantId === id);
        if (t) {
          this.patchForm(t);
        } else {
          this.errorMessage = 'Tenant not found.';
        }
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load tenant data.';
        this.isLoading = false;
      }
    });
  }

  submit(): void {
    this.submitted = true;
    if (this.tenantForm.invalid) return;

    const fv = this.tenantForm.value;
    const payload = {
      name: fv.name as string,
      phone: fv.phone as string,
      email: fv.email as string,
      address: (fv.address ?? '') as string,
      isActive: fv.isActive as boolean
    };

    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';

    if (this.isEditMode && this.editTenantId) {
      // EDIT: upload logo first (if a new file was chosen), then update tenant
      const editId = this.editTenantId;
      const doUpdate = () => {
        const tenant: Tenant = {
          tenantId: editId,
          ...payload,
          logoUrl: '',        // server manages logoUrl via upload endpoint
          createdOn: new Date().toISOString()
        };
        return this.tenantService.updateTenant(tenant);
      };

      const edit$ = this.selectedLogoFile
        ? this.tenantService.uploadLogo(editId, this.selectedLogoFile).pipe(switchMap(() => doUpdate()))
        : doUpdate();

      edit$.subscribe({
        next: () => {
          this.successMessage = 'Tenant updated successfully!';
          this.isLoading = false;
          setTimeout(() => this.router.navigate(['/tenants/manage-tenant']), 1200);
        },
        error: () => {
          this.errorMessage = 'Failed to update tenant. Please try again.';
          this.isLoading = false;
        }
      });
    } else {
      // ADD: create tenant first → then upload logo with the returned ID
      const logoFile = this.selectedLogoFile;
      this.tenantService.addTenant(payload).pipe(
        switchMap(res => {
          const newId = res.data?.tenantId;
          if (newId && logoFile) {
            return this.tenantService.uploadLogo(newId, logoFile);
          }
          return of(null);
        })
      ).subscribe({
        next: () => {
          this.successMessage = 'Tenant added successfully!';
          this.isLoading = false;
          this.tenantForm.reset({ isActive: true });
          this.logoPreview = '';
          this.selectedLogoFile = null;
          this.submitted = false;
        },
        error: () => {
          this.errorMessage = 'Failed to add tenant. Please try again.';
          this.isLoading = false;
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/tenants/manage-tenant']);
  }
}

