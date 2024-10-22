import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCyclesComponent } from './project-cycles.component';

describe('ProjectCyclesComponent', () => {
  let component: ProjectCyclesComponent;
  let fixture: ComponentFixture<ProjectCyclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectCyclesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectCyclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
