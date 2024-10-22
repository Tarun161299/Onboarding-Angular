import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EssoLoginComponent } from './esso-login.component';

describe('EssoLoginComponent', () => {
  let component: EssoLoginComponent;
  let fixture: ComponentFixture<EssoLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EssoLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EssoLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
