import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdAgencyComponent } from './md-agency.component';

describe('MdAgencyComponent', () => {
  let component: MdAgencyComponent;
  let fixture: ComponentFixture<MdAgencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdAgencyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MdAgencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
