import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsedetailviewComponent } from './responsedetailview.component';

describe('ResponsedetailviewComponent', () => {
  let component: ResponsedetailviewComponent;
  let fixture: ComponentFixture<ResponsedetailviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsedetailviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponsedetailviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
