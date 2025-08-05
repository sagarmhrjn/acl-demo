import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { permissionRoutes } from './permission.routes';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { PermissionComponent } from './permission.component';
import { NgxsModule } from '@ngxs/store';
import { PermissionStates } from './data-access/store';

@NgModule({
  declarations: [PermissionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(permissionRoutes),
    NgxsModule.forFeature([PermissionStates]),
    NzDividerModule,
    NzTableModule,
  ],
})
export class PermissionModule {}
