import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminViewComponent} from './admin-view.component';
import {AdminViewRoutingModule} from './admin-view.routes';
import {UserService} from './shared/service/user.service';
import {AppCommonModule} from './common/common.module';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AdminViewRoutingModule,
    AppCommonModule
  ],
  declarations: [
    AdminViewComponent
  ],
  providers: [
    UserService
  ]
})
export class AdminViewModule { }
