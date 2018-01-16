import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {RouterModule} from "@angular/router";
import {TruncatePipe} from "../shared/pipe/truncate.pipe";

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    HeaderComponent,
    TruncatePipe
  ],
  exports: [
    HeaderComponent,
    TruncatePipe
  ]
})
export class AppCommonModule { }
