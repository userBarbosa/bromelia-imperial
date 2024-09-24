import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigurationService } from '../../config/configuration.service';
import { Observable } from 'rxjs';
import { LoginUserResponse } from '../../../models/User';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private client: HttpClient, private cs: ConfigurationService) {}
  private readonly baseURL = 'http://localhost:4000';

  getMe(): Observable<LoginUserResponse> {
    return this.client.get<LoginUserResponse>(this.baseURL + '/users/me');
  }
}
