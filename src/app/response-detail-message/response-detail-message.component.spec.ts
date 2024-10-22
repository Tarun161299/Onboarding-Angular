import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseDetailMessageComponent } from './response-detail-message.component';

describe('ResponseDetailMessageComponent', () => {
  let component: ResponseDetailMessageComponent;
  let fixture: ComponentFixture<ResponseDetailMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponseDetailMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponseDetailMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
