import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSaleorderComponent } from './manage-saleorder.component';

describe('ManageSaleorderComponent', () => {
  let component: ManageSaleorderComponent;
  let fixture: ComponentFixture<ManageSaleorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageSaleorderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageSaleorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
