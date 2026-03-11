import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShiftService } from '../../../../core/services/shift.service';
import { Shift } from '../../../../core/models/shift';

@Component({
  selector: 'app-shift-master',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './shift-master.component.html',
  styleUrls: [
    './shift-master.component.css',
    '../../../styles/masters-style.css'
  ]
})
export class ShiftMasterComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);

  shiftName = '';
  isActive = true;
  error = '';

  shiftList: Shift[] = [];
  submitted = false;
  isEditMode = false;
  editingId: number | null = null;

  showConfirmDelete = false;
  confirmDeleteId: number | null = null;

  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(private shiftService: ShiftService) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadShifts();
    }
  }

  loadShifts(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.shiftService.getAllShifts(1, 100, false).subscribe({
      next: (res) => {
        this.shiftList = res.data ?? [];
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load shifts.';
        this.isLoading = false;
      }
    });
  }

  filterAlphabets(): void {
    this.shiftName = this.shiftName.replace(/[^a-zA-Z\s]/g, '');
  }

  addTable(): void {
    this.submitted = true;
    this.error = '';

    const trimmedName = this.shiftName.trim();
    if (!trimmedName || trimmedName.length < 3 || !/^[a-zA-Z\s]+$/.test(trimmedName)) return;

    const isDuplicate = this.shiftList.some(
      s => s.shiftName.toLowerCase() === trimmedName.toLowerCase() && s.shiftId !== this.editingId
    );
    if (isDuplicate) {
      this.error = 'Shift name already exists.';
      return;
    }

    const payload: Shift = { shiftId: this.editingId ?? 0, shiftName: trimmedName, isActive: this.isActive };

    if (this.isEditMode && this.editingId !== null) {
      this.shiftService.updateShift(this.editingId, payload).subscribe({
        next: () => {
          this.successMessage = 'Shift updated successfully!';
          this.loadShifts();
          this.resetForm();
          setTimeout(() => (this.successMessage = ''), 3000);
        },
        error: () => { this.errorMessage = 'Failed to update shift.'; }
      });
    } else {
      this.shiftService.createShift(payload).subscribe({
        next: () => {
          this.successMessage = 'Shift added successfully!';
          this.loadShifts();
          this.resetForm();
          setTimeout(() => (this.successMessage = ''), 3000);
        },
        error: () => { this.errorMessage = 'Failed to add shift.'; }
      });
    }
  }

  editTable(shift: Shift): void {
    this.shiftName = shift.shiftName;
    this.isActive = shift.isActive;
    this.isEditMode = true;
    this.editingId = shift.shiftId;
    this.error = '';
    this.submitted = false;
  }

  deleteTable(id: number): void {
    this.confirmDeleteId = id;
    this.showConfirmDelete = true;
  }

  confirmDelete(): void {
    if (this.confirmDeleteId !== null) {
      this.shiftService.deleteShift(this.confirmDeleteId).subscribe({
        next: () => {
          this.successMessage = 'Shift deleted successfully!';
          this.loadShifts();
          setTimeout(() => (this.successMessage = ''), 3000);
        },
        error: () => { this.errorMessage = 'Failed to delete shift.'; }
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
  }

  private resetForm(): void {
    this.shiftName = '';
    this.isActive = true;
    this.error = '';
    this.submitted = false;
    this.isEditMode = false;
    this.editingId = null;
  }
}
