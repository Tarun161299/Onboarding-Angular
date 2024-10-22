import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounsellingCalendraComponent } from './counselling-calendra.component';

describe('CounsellingCalendraComponent', () => {
  let component: CounsellingCalendraComponent;
  let fixture: ComponentFixture<CounsellingCalendraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounsellingCalendraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CounsellingCalendraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
