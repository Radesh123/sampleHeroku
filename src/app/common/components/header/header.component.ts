import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonDataService } from '../../services/common-data.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  registrationActive: boolean;
  userLoggedIn;
  @ViewChild('collapseButton', {static: false}) collapseButton: ElementRef;
  @ViewChild('collapsedContent', {static: false}) collapsedContent: ElementRef;

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.getUserLoggedIn.subscribe((status) => {
      this.userLoggedIn = status;
    });
  }

  navigateRegister(pagetype: string) {
    this.registrationActive = true;
    this.updateCollpseBtnStatus(true);
    let navigationPath = '/teacher-reg';
    if (pagetype === 'mentor') {
      navigationPath = '/mentor-reg';
    }
    this.router.navigate([navigationPath]);
  }

  navigateLogin() {
    this.registrationActive = false;
    this.updateCollpseBtnStatus(true);
    this.router.navigate(['/login']);
  }

  updateCollpseBtnStatus(status: boolean) {
    if (this.collapsedContent.nativeElement.classList.contains('show')) {
      this.collapseButton.nativeElement.click();
    }
  }
  logout() {
    sessionStorage.removeItem('userDetails');
    this.loginService.logout();
    this.router.navigate(['login']);
  }
  loginCheck(event) {
    console.log(event);
  }

}
