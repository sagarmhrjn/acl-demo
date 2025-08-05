import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { roleRoutes } from './role.routes';
import { RoleComponent } from './role.component';
import { NgxsModule } from '@ngxs/store';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { RoleStates } from './data-access/store';
import { PermissionStates } from '../permission/data-access/store';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { ReactiveFormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [RoleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(roleRoutes),
    NgxsModule.forFeature([RoleStates, PermissionStates]),
    NzDividerModule,
    NzTableModule,
    NzTagModule,
    ReactiveFormsModule,
    NzModalModule,
    NzFormModule,
    NzButtonComponent,
    NzIconModule,
  ],
})
export class RoleModule {}
