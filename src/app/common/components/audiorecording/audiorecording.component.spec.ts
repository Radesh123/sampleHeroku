import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudiorecordingComponent } from './audiorecording.component';

describe('AudiorecordingComponent', () => {
  let component: AudiorecordingComponent;
  let fixture: ComponentFixture<AudiorecordingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudiorecordingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudiorecordingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
