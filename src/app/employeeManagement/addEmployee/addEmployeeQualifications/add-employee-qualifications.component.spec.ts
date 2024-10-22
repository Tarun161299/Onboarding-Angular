import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeeQualificationsComponent } from './add-employee-qualifications.component';

describe('AddEmployeeQualificationsComponent', () => {
  let component: AddEmployeeQualificationsComponent;
  let fixture: ComponentFixture<AddEmployeeQualificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmployeeQualificationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEmployeeQualificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
