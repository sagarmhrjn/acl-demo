import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';
import { LoggedInGuard } from './core/logged-in.guard';
import { SuperAdminGuard } from './core/super-admin.guard';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';

export const routes: Routes = [
  {
    path: 'account',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        canActivate: [LoggedInGuard],
        loadChildren: () =>
          import('./modules/auth/auth.module').then((mod) => mod.AuthModule),
      },
    ],
  },
  {
    path: '',
    component: ContentLayoutComponent,
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      {
        path: 'users',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/user/user.module').then((mod) => mod.UserModule),
      },
      {
        path: 'roles',
        canActivate: [SuperAdminGuard],
        loadChildren: () =>
          import('./modules/role/role.module').then((mod) => mod.RoleModule),
      },
      {
        path: 'permissions',
        canActivate: [SuperAdminGuard],
        loadChildren: () =>
          import('./modules/permission/permission.module').then(
            (mod) => mod.PermissionModule,
          ),
      },
    ],
  },
];
