import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDebitnoteComponent } from './manage-debitnote.component';

describe('ManageDebitnoteComponent', () => {
  let component: ManageDebitnoteComponent;
  let fixture: ComponentFixture<ManageDebitnoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageDebitnoteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageDebitnoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
