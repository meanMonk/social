import { Component, OnInit } from '@angular/core';
import {UserService} from '../../shared/service/user.service';
import {Users} from '../../../pages/register/service/register.service';
import {CookieService} from "ngx-cookie";
import {StorageService} from "../../shared/service/storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public userInfo: Users;
  public referList: Users[];
  public location: string;
  constructor(public _userService: UserService,
              public router: Router,
              public _cookieService: CookieService,
              public _storageService: StorageService) {
  }

  ngOnInit() {
    this.location = window.location.origin;
    this.loadUserDetail();
    this.loadReferalInfo();
  }

  loadUserDetail() {
    this._userService.loadUserInfo()
      .subscribe(userInfo => {
        this.userInfo = userInfo;
        this._cookieService.put('user', JSON.stringify(userInfo));
      });
  }

  loadReferalInfo() {
    this._userService.loadMembers()
      .subscribe(res => {
        this.referList = res;
      });
  }

  memberDetail(mValue) {
     this._storageService.setUserDetail(mValue);
     this.router.navigate(['/profile']);
  }

  updateInfo(pValue) {
    this._storageService.setUserDetail(pValue);
    this.router.navigate(['/profile/update']);
  }

}
