import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZmstInstituteListComponent } from './zmst-institute-list.component';

describe('ZmstInstituteListComponent', () => {
  let component: ZmstInstituteListComponent;
  let fixture: ComponentFixture<ZmstInstituteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZmstInstituteListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZmstInstituteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
