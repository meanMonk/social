import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminViewComponent} from './admin-view.component';
import {AdminViewRoutingModule} from './admin-view.routes';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {UserService} from "./shared/service/user.service";

@NgModule({
  imports: [
    CommonModule,
    AdminViewRoutingModule
  ],
  declarations: [
    AdminViewComponent,
    DashboardComponent
  ],
  providers: [
    UserService
  ]
})
export class AdminViewModule { }
