import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-lesson-start',
  templateUrl: './lesson-start.component.html',
  styleUrls: ['./lesson-start.component.scss']
})
export class LessonStartComponent implements OnInit {
  stepText: string;
  text1: string;
  text2: string;
  text3: string;
  stepCount = 0;
  regVideoDesc: string;
  regText: string;
  @Input() lesson = 'Lesson 13';
  @Output() msgToParent = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
    this.stepText = this.lesson;
    this.text1 = 'Speak Well';
    this.text2 = 'Conversation Practice';
    this.text3 = 'Getting Started';
    this.regVideoDesc  = 'Getting Started Getting Started';
    this.regText = 'Getting Started'
  }

  showInstructions() {
    this.stepText = 'Instructions';
    this.stepCount++;
  }

  prevSection() {
    if (this.stepCount === 0) {
      this.msgToParent.emit('back');
    } else {
      this.stepText = this.lesson;
      this.stepCount--;
    }
  }

  startLesson() {
    this.msgToParent.emit('bigin');
  }

}
