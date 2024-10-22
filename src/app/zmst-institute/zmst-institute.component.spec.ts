import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZmstInstituteComponent } from './zmst-institute.component';

describe('ZmstInstituteComponent', () => {
  let component: ZmstInstituteComponent;
  let fixture: ComponentFixture<ZmstInstituteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZmstInstituteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZmstInstituteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
