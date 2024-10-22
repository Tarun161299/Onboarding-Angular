import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnBoardingViewStatusComponent } from './on-boarding-view-status.component';

describe('OnBoardingViewStatusComponent', () => {
  let component: OnBoardingViewStatusComponent;
  let fixture: ComponentFixture<OnBoardingViewStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnBoardingViewStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnBoardingViewStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
