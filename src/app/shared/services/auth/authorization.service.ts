import { Injectable } from '@angular/core';
import { ConfigurationService } from '../config/configuration.service';
import { HttpClient } from '@angular/common/http';
import { LOCAL_STORAGE_STRINGS, LoginUserResponse } from '../../models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  constructor(private client: HttpClient, private cs: ConfigurationService) {}

  private readonly baseURL = 'http://localhost:3000/api';

  setSession(response: LoginUserResponse): void {
    const expiresAt = Date.now() + response.data.expiresIn * 1000;

    localStorage.setItem(LOCAL_STORAGE_STRINGS.JWT, response.data.token);
    localStorage.setItem(
      LOCAL_STORAGE_STRINGS.EXPIRATION,
      JSON.stringify(expiresAt)
    );
    console.log(this.getExpiration());
  }

  login(email: string, password: string): Observable<LoginUserResponse> {
    return this.client.post<LoginUserResponse>(this.baseURL + '/users/login', {
      email,
      password,
    });
  }

  logout(): void {
    localStorage.removeItem(LOCAL_STORAGE_STRINGS.JWT);
    localStorage.removeItem(LOCAL_STORAGE_STRINGS.EXPIRATION);
  }

  isLoggedIn(): boolean {
    return Date.now() < this.getExpiration();
  }

  getExpiration(): number {
    const expiration = localStorage.getItem(LOCAL_STORAGE_STRINGS.EXPIRATION);
    if (!expiration) {
      return Date.now() - 10;
    }
    const expiresAt = JSON.parse(expiration);
    return new Date(expiresAt).getTime();
  }

  signup(email: string, password: string): Observable<LoginUserResponse> {
    return this.client.post<LoginUserResponse>(this.baseURL + '/users/signup', {
      email,
      password,
    });
  }
}
