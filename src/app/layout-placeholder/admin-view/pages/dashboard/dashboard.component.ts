import { Component, OnInit } from '@angular/core';
import {UserService} from "../../shared/service/user.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public _userService: UserService) { }

  ngOnInit() {
    this.loadUserData();
  }
  loadUserData() {
    this._userService.getUserData()
      /*.subscribe((res) => {
          console.log(res);
         },
        (err) => {
          console.log('error occured', err);
        }
      );*/
  }

}
