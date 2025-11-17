import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../environment/environment';
import { tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'jwt_token';
  public readonly PROFILE_URL = `${environment.apiUrl}`;
  private platformId = inject(PLATFORM_ID);

  constructor(private http: HttpClient) { }
  login(credentials: any) {
    return this.http.post(`${this.PROFILE_URL}/auth/login`, credentials).pipe(
      tap((response: any) => {
        if (response && response.accessToken) {
          this.setToken(response.accessToken);
        }
      })
    );
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  setToken(token: string) {
    if (this.isBrowser()) {
      localStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  getToken() {
    if (this.isBrowser()) {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.TOKEN_KEY);
    }
  }
}
