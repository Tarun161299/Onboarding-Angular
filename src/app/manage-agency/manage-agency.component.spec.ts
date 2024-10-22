import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAgencyComponent } from './manage-agency.component';

describe('ManageAgencyComponent', () => {
  let component: ManageAgencyComponent;
  let fixture: ComponentFixture<ManageAgencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAgencyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageAgencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
