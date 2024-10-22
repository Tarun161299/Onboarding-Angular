import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestnoMessageComponent } from './requestno-message.component';

describe('RequestnoMessageComponent', () => {
  let component: RequestnoMessageComponent;
  let fixture: ComponentFixture<RequestnoMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestnoMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestnoMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
