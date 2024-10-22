import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnBoardingRequestComponent } from './on-boarding-request.component';

describe('OnBordingRequestComponent', () => {
  let component: OnBoardingRequestComponent;
  let fixture: ComponentFixture<OnBoardingRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnBoardingRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnBoardingRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
