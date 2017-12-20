import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {EmailValidator} from '../../shared/service/validators';
import {RegisterService, Users} from './service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public errorMessage: string = 'User is does not exists!';
  public error: Boolean = false;
  public signUpForm: FormGroup;
  public returnUrl: string;

  constructor(public _fb: FormBuilder,
              public route: ActivatedRoute,
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
      this.registerService.createUser(userModel)
        .subscribe((res) => {
            this.error = false;
            const userInfo: any = {};
            userInfo['firstName'] = userModel.firstName;
            userInfo['lastName'] = userModel.lastName;
            userInfo['email'] = res.email;
            userInfo['createdAt'] = res.metadata.creationTime;
            userInfo['uid'] = res.uid;
            userInfo['referedBy'] = this.getRefernce();
            this.registerService.saveUserInfo(userInfo)
              .subscribe(res => {
                  console.log(res);
                  this.router.navigate(['/login']);
              });
          },
          (err) => {
            const errCode = err.code;
            this.error = true;
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


  getRefernce() {
    const cookie = document.cookie;
    const referBy = JSON.parse(cookie);
    console.log('refer by', referBy.frb);
    document.cookie = "";

    return referBy.rfb;
  }

}
