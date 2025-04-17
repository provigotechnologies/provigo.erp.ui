import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceipeMasterComponent } from './receipe-master.component';

describe('ReceipeMasterComponent', () => {
  let component: ReceipeMasterComponent;
  let fixture: ComponentFixture<ReceipeMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceipeMasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceipeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
