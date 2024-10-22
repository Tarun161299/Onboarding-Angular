import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZmstAgencyvirtualdirectorymappingComponent } from './zmst-agencyvirtualdirectorymapping.component';

describe('ZmstAgencyvirtualdirectorymappingComponent', () => {
  let component: ZmstAgencyvirtualdirectorymappingComponent;
  let fixture: ComponentFixture<ZmstAgencyvirtualdirectorymappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZmstAgencyvirtualdirectorymappingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZmstAgencyvirtualdirectorymappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
