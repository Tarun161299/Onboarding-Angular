import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationScheduleComponent } from './application-schedule.component';

describe('ApplicationScheduleComponent', () => {
  let component: ApplicationScheduleComponent;
  let fixture: ComponentFixture<ApplicationScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
