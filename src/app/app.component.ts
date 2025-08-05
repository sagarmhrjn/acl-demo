import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngxs/store';
import { GetAllPermissionAction } from './modules/permission/data-access/store';
import { GetAllRoleAction } from './modules/role/data-access/store';

/**
 * Root component that bootstraps the Angular application.
 *
 * Contains the main layout and router outlet.
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private _store = inject(Store);

  ngOnInit(): void {
    this._store.dispatch([
      new GetAllPermissionAction(),
      new GetAllRoleAction(),
    ]);
  }
}
