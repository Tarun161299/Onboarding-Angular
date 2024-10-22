import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterPageHomeComponent } from './master-page-home.component';

describe('MasterPageHomeComponent', () => {
  let component: MasterPageHomeComponent;
  let fixture: ComponentFixture<MasterPageHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterPageHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterPageHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
