import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {AuthGuard} from "./layout-placeholder/shared/service/auth.guard";

export const APP_ROUTES: Routes = [
  {
    path: 'login',
    loadChildren: './layout-placeholder/pages/login/login.module#LoginModule'
  },
  {
    path: 'register',
    loadChildren: './layout-placeholder/pages/register/register.module#RegisterModule'
  },
  {
    path: '',
    loadChildren: './layout-placeholder/admin-view/admin-view.module#AdminViewModule',
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

export  const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
