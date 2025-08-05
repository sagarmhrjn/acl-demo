import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

/**
 * A class for handling user service
 * */
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:3000/users';

  private _http = inject(HttpClient);

  /**
   * Get all users
   *
   * @returns Observable of type array of user
   * */
  getAllUsers(): Observable<User[]> {
    return this._http.get<User[]>(this.baseUrl);
  }

  /**
   * Get user by id
   *
   * @param id user id of type number
   *
   * @returns Observable of type user
   * */
  getUserById(id: number): Observable<User> {
    return this._http.get<User>(`${this.baseUrl}/${id}`);
  }

  /**
   * Create a new user
   *
   * @param user data payload of type user
   *
   * @returns Observable of type user
   * */
  createUser(user: User): Observable<User> {
    return this._http.post<User>(this.baseUrl, user);
  }

  /**
   * Update user by id
   *
   * @param id user id of type string
   * @param user partial data payload of type user
   *
   * @returns Observable of type User
   * */
  updateUser(id: string, user: Partial<User>): Observable<User> {
    return this._http.put<User>(`${this.baseUrl}/${id}`, user);
  }

  /**
   * Delete user by id
   *
   * @param id user id of type string
   *
   * @returns Observable of type void
   * */
  deleteUser(id: string): Observable<void> {
    return this._http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
