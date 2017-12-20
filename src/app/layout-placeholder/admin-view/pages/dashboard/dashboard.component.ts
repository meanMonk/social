import { Component, OnInit } from '@angular/core';
import {UserService} from "../../shared/service/user.service";
import {Users} from "../../../pages/register/service/register.service";
import {Observable} from "rxjs/Observable";
import {User} from "firebase";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public userInfo: Users;
  public referal: Observable<Users>;
  constructor(public userService: UserService) {
  }

  ngOnInit() {
    this.userService.loadUserInfo()
      .subscribe(userInfo => {
          this.userInfo = userInfo;
          this.referal = this.userService.loadReferalInfo(userInfo.referedBy);
      });

  }

}
