import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeeQualificationComponent } from './add-employee-qualification.component';

describe('AddEmployeeQualificationComponent', () => {
  let component: AddEmployeeQualificationComponent;
  let fixture: ComponentFixture<AddEmployeeQualificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmployeeQualificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEmployeeQualificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
