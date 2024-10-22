import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaywiseRegistrationComponent } from './daywise-registration.component';

describe('DaywiseRegistrationComponent', () => {
  let component: DaywiseRegistrationComponent;
  let fixture: ComponentFixture<DaywiseRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DaywiseRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DaywiseRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
