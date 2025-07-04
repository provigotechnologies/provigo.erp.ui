import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCreditnoteComponent } from './manage-creditnote.component';

describe('ManageCreditnoteComponent', () => {
  let component: ManageCreditnoteComponent;
  let fixture: ComponentFixture<ManageCreditnoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageCreditnoteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCreditnoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
