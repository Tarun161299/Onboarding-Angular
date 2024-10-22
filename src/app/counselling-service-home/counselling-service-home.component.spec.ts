import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounsellingServiceHomeComponent } from './counselling-service-home.component';

describe('CounsellingServiceHomeComponent', () => {
  let component: CounsellingServiceHomeComponent;
  let fixture: ComponentFixture<CounsellingServiceHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounsellingServiceHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CounsellingServiceHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
