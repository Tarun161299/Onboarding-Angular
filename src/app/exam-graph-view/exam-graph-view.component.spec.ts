import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamGraphViewComponent } from './exam-graph-view.component';

describe('ExamGraphViewComponent', () => {
  let component: ExamGraphViewComponent;
  let fixture: ComponentFixture<ExamGraphViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamGraphViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamGraphViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
