import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZmstQualifyingExamLearningModeComponent } from './zmst-qualifying-exam-learning-mode.component';

describe('ZmstQualifyingExamLearningModeComponent', () => {
  let component: ZmstQualifyingExamLearningModeComponent;
  let fixture: ComponentFixture<ZmstQualifyingExamLearningModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZmstQualifyingExamLearningModeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZmstQualifyingExamLearningModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
