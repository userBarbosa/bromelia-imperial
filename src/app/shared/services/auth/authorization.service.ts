import { Injectable } from '@angular/core';
import { ConfigurationService } from '../config/configuration.service';
import { HttpClient } from '@angular/common/http';
import { LOCAL_STORAGE_STRINGS, LoginUserResponse } from '../../models/User';
import { Observable } from 'rxjs';
import { UsersService } from '../api/users/users.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  private baseURL: string;
  constructor(
    private client: HttpClient,
    private cs: ConfigurationService,
    private usersService: UsersService
  ) {
    this.baseURL = this.cs.BASE_URL;
  }

  setSession(response: LoginUserResponse): void {
    const expiresAt = Date.now() + response.data.expiresIn * 1000;

    localStorage.setItem(LOCAL_STORAGE_STRINGS.JWT, response.data.token);
    localStorage.setItem(
      LOCAL_STORAGE_STRINGS.EXPIRATION,
      JSON.stringify(expiresAt)
    );
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

  login(email: string, password: string): Observable<LoginUserResponse> {
    return this.usersService.Login(email, password);
  }

  signup(
    name: string,
    email: string,
    password: string
  ): Observable<LoginUserResponse> {
    return this.usersService.SignUp(name, email, password);
  }
}
