import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AudioRecordingService } from '../../services/audio-recording-service.service';

@Component({
  selector: 'app-audiorecording',
  templateUrl: './audiorecording.component.html',
  styleUrls: ['./audiorecording.component.scss'],
  providers: [AudioRecordingService]
})
export class AudiorecordingComponent implements OnInit {
  isRecording = false;
  recordedTime: any;
  blobUrl: any;
  blobData: any;
  @Output() audioFile = new EventEmitter
  constructor(private sanitizer: DomSanitizer, private audioRecordingService: AudioRecordingService) { }

  ngOnInit() {
    this.audioRecordingService.recordingFailed().subscribe(() => {
      this.isRecording = false;
    });
    this.audioRecordingService.getRecordedTime().subscribe((time) => {
      this.recordedTime = time;
    });
    this.audioRecordingService.getRecordedBlob().subscribe((data) => {
      this.blobData = data.blob;
      this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data.blob));
    });
  }

  startRecording() {
    if (!this.isRecording) {
      this.isRecording = true;
      this.audioRecordingService.startRecording();
    }
  }

  abortRecording() {
    if (this.isRecording) {
      this.isRecording = false;
      this.audioRecordingService.abortRecording();
    }
    this.blobData = null;
  }

  stopRecording() {
    if (this.isRecording) {
      this.audioRecordingService.stopRecording();
      this.isRecording = false;
    }
  }

  clearRecordedData() {
    this.blobUrl = null;
  }

  sendAudioBlob() {
    this.audioFile.emit(this.blobData);
    this.isRecording = false;
    this.blobData = null;
  }

  editRecording(url) {
    this.blobData = url;
    this.blobUrl = url;
  }

}
