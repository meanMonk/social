import { Component, OnInit } from '@angular/core';
import {UserService} from "../../shared/service/user.service";
import {Users} from "../../../pages/register/service/register.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public userInfo: Users;
  public referalName: string;
  constructor(public _userService: UserService) { }

  ngOnInit() {
    this.loadUserData();
  }

  /*load the current user data*/
  loadUserData() {
    this._userService.getCurrentUserId().subscribe(user => {
     user && user.uid && this._userService.getUserData(user.uid)
        .subscribe((res: Users[]) => {
          this.userInfo = res[0];
          console.log('user info', res[0]);
          this.getReferalName(this.userInfo.referedBy);
        },
          err => {
            console.log(err);
          });
    });
  }

  /*get the referal name*/
  getReferalName(uid) {
    uid && this._userService.getUserData(uid)
      .subscribe( (res) => {
          if (res[0]) {
            this.referalName = res[0]['firstName'] + " " + res[0]['lastName'];
          }
          else {
            this.referalName = "No referal"
          }
      },
        (err) => {
        console.log(err);
        })
  }

}
