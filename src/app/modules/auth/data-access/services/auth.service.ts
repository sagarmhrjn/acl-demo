import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { AuthDTO, User } from '../models/auth.model';

/**
 * A class for handling authentication Service
 * */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';

  private _http = inject(HttpClient);

  /**
   * Handles user login.
   * Sends login credentials to the API.
   * May also persist the token to localStorage if needed.
   *
   * @param authDTO object of type auth DTO
   *
   * @returns Observable of any
   */
  login(authDTO: AuthDTO): Observable<{ token: string; user: User }> {
    return this._http.get<User[]>(`${this.baseUrl}/users`).pipe(
      map((users) => {
        const user = users.find(
          (u) =>
            (u.email === authDTO.email || u.username === authDTO.email) &&
            u.password === authDTO.password,
        );

        if (user) {
          return { token: 'jwt-token', user };
        }

        throw new Error('Invalid username or password');
      }),
      catchError((err) => throwError(() => err)),
    );
  }
}
