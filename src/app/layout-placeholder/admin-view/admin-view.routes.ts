import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {AdminViewComponent} from './admin-view.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminViewComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      }
    ]
  }
];

export const AdminViewRoutingModule: ModuleWithProviders = RouterModule.forChild(ADMIN_ROUTES);
