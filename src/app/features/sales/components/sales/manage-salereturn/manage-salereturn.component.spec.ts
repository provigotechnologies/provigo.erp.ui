import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSalereturnComponent } from './manage-salereturn.component';

describe('ManageSalereturnComponent', () => {
  let component: ManageSalereturnComponent;
  let fixture: ComponentFixture<ManageSalereturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageSalereturnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageSalereturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
