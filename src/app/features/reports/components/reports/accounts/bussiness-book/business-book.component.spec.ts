import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessBookComponent } from './business-book.component';

describe('BusinessBookComponent', () => {
  let component: BusinessBookComponent;
  let fixture: ComponentFixture<BusinessBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessBookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
