import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDiscountSchemeComponent } from './manage-discount-scheme.component';

describe('ManageDiscountSchemeComponent', () => {
  let component: ManageDiscountSchemeComponent;
  let fixture: ComponentFixture<ManageDiscountSchemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageDiscountSchemeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageDiscountSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
