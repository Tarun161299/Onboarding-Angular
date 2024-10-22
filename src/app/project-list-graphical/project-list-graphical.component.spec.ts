import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListGraphicalComponent } from './project-list-graphical.component';

describe('ProjectListGraphicalComponent', () => {
  let component: ProjectListGraphicalComponent;
  let fixture: ComponentFixture<ProjectListGraphicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectListGraphicalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectListGraphicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
