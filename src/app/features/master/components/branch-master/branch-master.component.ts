import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BranchService } from '../../../../core/services/branch.service';
import { Branch } from '../../../../core/models/branch';

@Component({
  selector: 'app-branch-master',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './branch-master.component.html',
  styleUrls: [
    './branch-master.component.css',
    '../../../styles/groupandadjustserialno-style.css'
  ]
})
export class BranchMasterComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);

  branchName = '';
  address = '';
  isActive = true;

  branchList: Branch[] = [];

  submitted = false;
  error = '';
  showConfirm = false;
  isEditMode = false;
  editingId: string | null = null;

  showConfirmDelete = false;
  confirmDeleteId: string | null = null;

  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(private branchService: BranchService) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadBranches();
    }
  }

  loadBranches(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.branchService.getBranches().subscribe({
      next: (data) => {
        this.branchList = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load branches.';
        this.isLoading = false;
      }
    });
  }

  addTable(): void {
    this.submitted = true;
    this.error = '';
    this.showConfirm = false;

    if (!this.branchName.trim()) {
      this.error = 'Branch name is required.';
      this.showConfirm = true;
      return;
    }

    if (this.branchName.trim().length < 2) {
      this.error = 'Branch name must be at least 2 characters.';
      this.showConfirm = true;
      return;
    }

    const payload: Partial<Branch> = {
      branchName: this.branchName.trim(),
      address: this.address.trim(),
      isActive: this.isActive
    };

    if (this.isEditMode && this.editingId) {
      this.branchService.updateBranch(this.editingId, payload).subscribe({
        next: () => {
          this.successMessage = 'Branch updated successfully!';
          this.loadBranches();
          this.resetForm();
          setTimeout(() => (this.successMessage = ''), 3000);
        },
        error: () => {
          this.errorMessage = 'Failed to update branch.';
        }
      });
    } else {
      this.branchService.addBranch(payload).subscribe({
        next: () => {
          this.successMessage = 'Branch added successfully!';
          this.loadBranches();
          this.resetForm();
          setTimeout(() => (this.successMessage = ''), 3000);
        },
        error: () => {
          this.errorMessage = 'Failed to add branch.';
        }
      });
    }
  }

  editTable(branch: Branch): void {
    this.branchName = branch.branchName;
    this.address = branch.address;
    this.isActive = branch.isActive;
    this.isEditMode = true;
    this.editingId = branch.branchId;
    this.error = '';
    this.showConfirm = false;
    this.submitted = false;
  }

  deleteTable(id: string): void {
    this.confirmDeleteId = id;
    this.showConfirmDelete = true;
  }

  confirmDelete(): void {
    if (this.confirmDeleteId) {
      this.branchService.deleteBranch(this.confirmDeleteId).subscribe({
        next: () => {
          this.successMessage = 'Branch deleted successfully!';
          this.loadBranches();
          setTimeout(() => (this.successMessage = ''), 3000);
        },
        error: () => {
          this.errorMessage = 'Failed to delete branch.';
        }
      });
    }
    this.cancelDelete();
  }

  cancelDelete(): void {
    this.confirmDeleteId = null;
    this.showConfirmDelete = false;
  }

  cancel(): void {
    this.resetForm();
    this.showConfirm = false;
  }

  private resetForm(): void {
    this.branchName = '';
    this.address = '';
    this.isActive = true;
    this.error = '';
    this.submitted = false;
    this.isEditMode = false;
    this.editingId = null;
  }
}

