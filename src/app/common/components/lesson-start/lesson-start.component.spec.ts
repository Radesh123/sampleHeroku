import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonStartComponent } from './lesson-start.component';

describe('LessonStartComponent', () => {
  let component: LessonStartComponent;
  let fixture: ComponentFixture<LessonStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
