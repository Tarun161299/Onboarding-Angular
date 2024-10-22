import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmuDashboardComponent } from './pmu-dashboard.component';

describe('PmuDashboardComponent', () => {
  let component: PmuDashboardComponent;
  let fixture: ComponentFixture<PmuDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmuDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmuDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
