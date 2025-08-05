import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

/**
 * Layout component for authentication-related pages (e.g., login, registration).
 *
 * Handles common UI structure for auth views.
 */
@Component({
  selector: 'app-auth-layout',
  imports: [RouterModule],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss',
})
export class AuthLayoutComponent {}
