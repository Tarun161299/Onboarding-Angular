import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamRegistrationSummaryComponent } from './exam-registration-summary.component';

describe('ExamRegistrationSummaryComponent', () => {
  let component: ExamRegistrationSummaryComponent;
  let fixture: ComponentFixture<ExamRegistrationSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamRegistrationSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamRegistrationSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
