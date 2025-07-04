import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePurchaseBillComponent } from './manage-purchase-bill.component';

describe('ManagePurchaseBillComponent', () => {
  let component: ManagePurchaseBillComponent;
  let fixture: ComponentFixture<ManagePurchaseBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagePurchaseBillComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagePurchaseBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
