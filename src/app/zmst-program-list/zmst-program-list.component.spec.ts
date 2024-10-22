import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZmstProgramListComponent } from './zmst-program-list.component';

describe('ZmstProgramListComponent', () => {
  let component: ZmstProgramListComponent;
  let fixture: ComponentFixture<ZmstProgramListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZmstProgramListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZmstProgramListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
