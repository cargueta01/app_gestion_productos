import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import {
  AuthResponse,
  LoginRequest
} from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly apiUrl = 'http://localhost:8080/api/auth';
  private readonly tokenKey = 'serfina_token';
  private readonly userKey = 'serfina_user';

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/login`, request)
      .pipe(
        tap(response => {
          localStorage.setItem(this.tokenKey, response.token);
          localStorage.setItem(
            this.userKey,
            JSON.stringify({
              email: response.email,
              role: response.role
            })
          );
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getUser(): { email: string; role: 'USER' | 'ADMIN' } | null {
    const user = localStorage.getItem(this.userKey);

    return user ? JSON.parse(user) : null;
  }

  isAdmin(): boolean {
    return this.getUser()?.role === 'ADMIN';
  }
}