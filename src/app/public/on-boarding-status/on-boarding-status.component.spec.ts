import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnBoardingStatusComponent } from './on-boarding-status.component';

describe('OnBoardingStatusComponent', () => {
  let component: OnBoardingStatusComponent;
  let fixture: ComponentFixture<OnBoardingStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnBoardingStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnBoardingStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
