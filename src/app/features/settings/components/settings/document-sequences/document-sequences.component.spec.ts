import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentSequencesComponent } from './document-sequences.component';

describe('DocumentSequencesComponent', () => {
  let component: DocumentSequencesComponent;
  let fixture: ComponentFixture<DocumentSequencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentSequencesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentSequencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
