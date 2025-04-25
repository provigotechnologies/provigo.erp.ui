import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSchemeItemComponent } from './add-scheme-item.component';

describe('AddSchemeItemComponent', () => {
  let component: AddSchemeItemComponent;
  let fixture: ComponentFixture<AddSchemeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSchemeItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSchemeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
