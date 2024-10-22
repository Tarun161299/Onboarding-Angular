import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingListNewComponent } from './onboarding-list-new.component';

describe('OnboardingListNewComponent', () => {
  let component: OnboardingListNewComponent;
  let fixture: ComponentFixture<OnboardingListNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingListNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingListNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
