import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnBoardingDetailsComponent } from './on-boarding-details.component';

describe('OnBordingDetailsComponent', () => {
  let component: OnBoardingDetailsComponent;
  let fixture: ComponentFixture<OnBoardingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnBoardingDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnBoardingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
