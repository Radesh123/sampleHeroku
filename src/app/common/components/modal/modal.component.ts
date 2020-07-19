import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

export class ModalConfig {
  headerText?: string;
  bodyText: string;
}
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  showModal = false;
  headerText: string;
  bodyText: string;
  @ViewChild('myModal', {static: false, read: ElementRef}) modalElm: ElementRef;
  constructor() { }

  ngOnInit() {
  }

  openModal(config: ModalConfig) {
    this.showModal = true;
    this.headerText = config.headerText;
    this.bodyText = config.bodyText;
  }

  closeModal() {
    this.showModal = false;
  }

}
