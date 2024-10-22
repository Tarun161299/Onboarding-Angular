import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnBoardingManagementComponent } from './on-boarding-management.component';

describe('OnBoardingManagementComponent', () => {
  let component: OnBoardingManagementComponent;
  let fixture: ComponentFixture<OnBoardingManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnBoardingManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnBoardingManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
