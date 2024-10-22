import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamManagementServicesComponent } from './exam-management-services.component';

describe('ExamManagementServicesComponent', () => {
  let component: ExamManagementServicesComponent;
  let fixture: ComponentFixture<ExamManagementServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamManagementServicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamManagementServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
