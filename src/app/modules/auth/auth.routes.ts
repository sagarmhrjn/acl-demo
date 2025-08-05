import { Routes } from '@angular/router';
import { LoginComponent } from './feature/login/login.component';

export const authRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
];
