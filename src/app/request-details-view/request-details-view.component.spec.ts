import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDetailsViewComponent } from './request-details-view.component';

describe('RequestDetailsViewComponent', () => {
  let component: RequestDetailsViewComponent;
  let fixture: ComponentFixture<RequestDetailsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestDetailsViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
