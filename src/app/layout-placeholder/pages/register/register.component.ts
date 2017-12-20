import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {EmailValidator} from '../../shared/service/validators';
import {RegisterService, Users} from './service/register.service';
import {CookieService} from "ngx-cookie";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public errorMessage: string = 'User is does not exists!';
  public error: Boolean;
  public signUpForm: FormGroup;
  public returnUrl: string;

  constructor(public _fb: FormBuilder,
              public _cookieService: CookieService,
              public registerService: RegisterService,
              public router: Router) { }

  ngOnInit() {
    this.refreshForm();
  }

  refreshForm() {
    this.signUpForm = this._fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.compose([Validators.required, EmailValidator.isValid])]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  register(userModel: any, isValid: boolean) {
    if (isValid) {
      this.error = true;
      userModel['referedBy'] = this._cookieService.get('rfb');
      this.registerService.createUser(userModel)
        .subscribe((res) => {
            this.error = false;
            this.router.navigate(['/login']);
          },
          (err) => {
            const errCode = err.code;
            console.log(err);
            if (errCode === 'auth/wrong-password') {
              this.errorMessage = 'Password is incorrect';
            } else if (errCode === 'auth/invalid-email') {
              this.errorMessage = 'Email is incorrect';
            } else if (errCode === 400) {
              this.errorMessage = 'Email is not found';
            } else {
              this.errorMessage = 'Email and Password is incorrect!';
            }
          }
        );
    }
  }

}
