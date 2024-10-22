import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignOffAdminComponent } from './sign-off-admin.component';

describe('SignOffAdminComponent', () => {
  let component: SignOffAdminComponent;
  let fixture: ComponentFixture<SignOffAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignOffAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignOffAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
