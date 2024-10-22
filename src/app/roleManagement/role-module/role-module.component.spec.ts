import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleModuleComponent } from './role-module.component';

describe('RoleModuleComponent', () => {
  let component: RoleModuleComponent;
  let fixture: ComponentFixture<RoleModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleModuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
