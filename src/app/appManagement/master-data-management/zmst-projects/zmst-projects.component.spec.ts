import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZmstProjectsComponent } from './zmst-projects.component';

describe('ZmstProjectsComponent', () => {
  let component: ZmstProjectsComponent;
  let fixture: ComponentFixture<ZmstProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZmstProjectsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZmstProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
