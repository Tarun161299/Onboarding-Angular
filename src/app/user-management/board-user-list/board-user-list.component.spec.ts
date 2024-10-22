import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardUserListComponent } from './board-user-list.component';

describe('BoardUserListComponent', () => {
  let component: BoardUserListComponent;
  let fixture: ComponentFixture<BoardUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardUserListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
