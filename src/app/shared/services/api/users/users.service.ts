import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigurationService } from '../../config/configuration.service';
import { Observable } from 'rxjs';
import { LoginUserResponse } from '../../../models/User';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseURL: string;
  constructor(private client: HttpClient, private cs: ConfigurationService) {
    this.baseURL = this.cs.BASE_URL;
  }

  GetMe(): Observable<LoginUserResponse> {
    return this.client.get<LoginUserResponse>(this.baseURL + '/users/me');
  }

  Login(email: string, password: string): Observable<LoginUserResponse> {
    return this.client.post<LoginUserResponse>(this.baseURL + '/users/login', {
      email,
      password,
    });
  }

  SignUp(
    name: string,
    email: string,
    password: string
  ): Observable<LoginUserResponse> {
    return this.client.post<LoginUserResponse>(this.baseURL + '/users/signup', {
      name,
      email,
      password,
    });
  }
}
