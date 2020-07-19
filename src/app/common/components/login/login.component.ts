import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RestService } from '../../services/rest.service';
import { CommonDataService } from '../../services/common-data.service';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  nextClicked = false;
  loginResponse;
  errorMessage;
  hide = true;
  passwordReset = false;
  @Output() userLogin: EventEmitter<any> = new EventEmitter();
  constructor(private fb: FormBuilder,
              private restService: RestService,
              private router: Router,
              private loginService: LoginService) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', Validators.required)
    });
  }


  toggleEyeIcon() {
    this.hide = !this.hide;
  }
  triggerForgotPassword(emailValue) {
    if (emailValue) {
      const body = {
        'username': emailValue
      };
      this.restService.post('account/forgotpassword', body).subscribe((response) => {
        this.passwordReset = response['success'];
        this.loginForm.reset();
      }, (error) => {
        this.errorMessage = error;
      });
    }
  }

  loginUser() {
    this.errorMessage = '';
    this.nextClicked = true;
    const loginDetails = this.prepareLoginRequest();
    if (this.loginForm.valid) {
      this.restService.post('account/login', loginDetails).subscribe((response) => {
        console.log(response);
        sessionStorage.setItem('userName', response['body']['name']);
        sessionStorage.setItem('userId', response['body']['userId']);
        if (response['body']['userRoles'] && response['body']['userRoles'].length > 0 ) {
          this.loginService.login(response['success']);
          if (response['body']['userRoles'][0]['name'] === 'Teacher') {
            this.router.navigate(['teacher-dashboard']);
          } else if (response['body']['userRoles'][0]['name'] === 'Administrator') {
            this.router.navigate(['mentorapproval']);
          } else if (response['body']['userRoles'][0]['name'] === 'Mentor') {
            this.router.navigate(['mentor-dashboard']);
          }
        }
      }, (error) => {
        this.errorMessage = error;
        console.log(this.errorMessage);
      });
    }
  }
  prepareLoginRequest() {
    const request = {
      'Username': this.loginForm.value.email,
      'Password': this.loginForm.value.password
    };
    return request;
  }

}
