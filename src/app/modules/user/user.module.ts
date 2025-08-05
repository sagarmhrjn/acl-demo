import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { userRoutes } from './user.routes';
import { RouterModule } from '@angular/router';
import { UserStates } from './data-access/store';
import { NgxsModule } from '@ngxs/store';
import { NzTableModule } from 'ng-zorro-antd/table';
import { UserComponent } from './user.component';
import { RoleStates } from '../role/data-access/store';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(userRoutes),
    NgxsModule.forFeature([UserStates, RoleStates]),
    NzTableModule,
    NzIconModule,
    NzButtonComponent,
    NzModalModule,
  ],
})
export class UserModule {}
