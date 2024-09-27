import { Observable } from 'rxjs';
import { Group, GroupContactsResponse, GroupsResponse } from './../../../models/Group';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigurationService } from '../../config/configuration.service';

@Injectable({
  providedIn: 'root',
})
export class GroupsService {
  private baseURL: string;
  constructor(private client: HttpClient, private cs: ConfigurationService) {
    this.baseURL = this.cs.BASE_URL + '/groups';
  }

  GetContactsFromGroupId(groupId: string): Observable<GroupContactsResponse> {
    return this.client.get<GroupContactsResponse>(
      this.baseURL + `/${groupId}/contacts/`
    );
  }

  getUserGroups(): Observable<GroupsResponse> {
    return this.client.get<GroupsResponse>(this.baseURL + `/`);
  }
}
