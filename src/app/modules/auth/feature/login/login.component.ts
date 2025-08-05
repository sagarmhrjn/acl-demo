import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngxs/store';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { LoginAction } from '../../data-access/store';

/**
 * Manages user login UI and authentication logic.
 *
 * Displays login form and handles user sign-in.
 */
@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzIconModule,
    NzButtonComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;

  /** Controls whether the password input is visible as plain text */
  passwordVisible = false;

  /**
   * Initializes the component with injected dependencies and sets up the login form.
   *
   * @param _store NGXS Store for dispatching authentication actions
   * @param _fb FormBuilder service for creating the reactive login form
   */
  constructor(
    private readonly _store: Store,
    private readonly _fb: FormBuilder,
  ) {
    // Initialize the login form with validators
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false],
    });
  }

  /**
   * Toggles the visibility of the password field between plain text and masked.
   */
  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  /**
   * Handles the login form submission.
   * If the form is valid, dispatches the login action with credentials.
   * If invalid, marks all fields as touched to show validation errors.
   */
  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this._store.dispatch(new LoginAction({ email, password }));
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
