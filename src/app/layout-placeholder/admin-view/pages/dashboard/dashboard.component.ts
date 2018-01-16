import { Component, OnInit } from '@angular/core';
import {UserService} from '../../shared/service/user.service';
import {Users} from '../../../pages/register/service/register.service';
import {CookieService} from "ngx-cookie";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public userInfo: Users;
  public location: string;
  constructor(public userService: UserService,
              public _cookieService: CookieService) {
  }

  ngOnInit() {
    this.location = window.location.origin;
    this.userService.loadUserInfo()
      .subscribe(userInfo => {
          this.userInfo = userInfo;
          this._cookieService.put('user', JSON.stringify(userInfo));
      });
  }

}
