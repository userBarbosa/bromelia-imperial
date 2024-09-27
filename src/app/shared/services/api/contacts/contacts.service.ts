import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigurationService } from '../../config/configuration.service';
import { Observable } from 'rxjs';
import { ContactResponse } from '../../../models/Contact';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  private baseURL: string;
  constructor(private client: HttpClient, private cs: ConfigurationService) {
    this.baseURL = this.cs.BASE_URL + '/contacts/';
  }

  getContact(id: string): Observable<ContactResponse> {
    return this.client.get<ContactResponse>(this.baseURL + id);
  }
}
