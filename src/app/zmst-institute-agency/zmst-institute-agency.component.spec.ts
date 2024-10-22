import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZmstInstituteAgencyComponent } from './zmst-institute-agency.component';

describe('ZmstInstituteAgencyComponent', () => {
  let component: ZmstInstituteAgencyComponent;
  let fixture: ComponentFixture<ZmstInstituteAgencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZmstInstituteAgencyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZmstInstituteAgencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
