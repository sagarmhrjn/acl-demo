import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
/**
 * Layout component for main application content.
 *
 * Wraps the core UI elements and handles general page structure.
 */
@Component({
  selector: 'app-content-layout',
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    RouterOutlet,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    NzDropDownModule,
    NzAvatarModule,
  ],
  templateUrl: './content-layout.component.html',
  styleUrl: './content-layout.component.scss',
})
export class ContentLayoutComponent implements OnInit {
  /** Sidebar toggle state */
  isCollapsed = false;

  /** Whether the user is a super admin */
  isSuperAdmin: boolean = false;

  /** Full name of the logged-in user */
  userName!: string;

  /** Static avatar URL for the user */
  userAvatar =
    'https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png';

  private _router = inject(Router);

  /**
   * Initializes user data from localStorage
   */
  ngOnInit(): void {
    const userJson = localStorage.getItem('auth_user');
    if (userJson) {
      const userDetails = JSON.parse(userJson);
      const user = userDetails.user;
      this.userName = `${user.firstName} ${user.lastName}`;
      this.isSuperAdmin = user.isSuperAdmin === true;
    }
  }

  /**
   * Logs the user out and redirects to the login page
   */

  logout(): void {
    localStorage.removeItem('auth_user');
    this._router.navigate(['/account/login']);
  }
}
