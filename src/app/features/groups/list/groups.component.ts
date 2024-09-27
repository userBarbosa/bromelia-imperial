import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Group } from '../../../shared/models/Group';
import { Router } from '@angular/router';
import { GroupsService } from '../../../shared/services/api/groups/groups.service';
import { Contact } from '../../../shared/models/Contact';
import { ToastService } from '../../../shared/services/toast/toast.service';
import { ContactsCardComponent } from '../../contacts/card/card.component';
import { FABService } from '../../../shared/services/floating-action-button/fab.service';
import { FabComponent } from '../../../shared/components/floating-action-button/fab.component';

@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [CommonModule, ContactsCardComponent, FabComponent],
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.less',
})
export class GroupsListComponent implements OnInit {
  groups: Group[] = [];
  constructor(
    private groupsService: GroupsService,
    private fabService: FABService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.fabService.clearOptions();
    this.fabService.setOptions([
      { icon: 'group_add', label: 'Novo grupo', route: '/groups/new' },
      { icon: 'person_add', label: 'Novo contato', route: '/contacts/new' },
    ]);

    // this.groupsService.getUserGroups().subscribe((data) => (this.groups = data))
    this.groups = [
      {
        id: '66f5b85ef0d422f8d8a150bf',
        name: 'Friends Forever',
        description:
          'This group was created to help your friends to not forget each other.',
        members: [{ userId: '66f5b7e60c2734dd23828cc4', isAdmin: true }],
        createdBy: '66f5b7e60c2734dd23828cc4',
        updatedBy: '66f5b7e60c2734dd23828cc4',
        createdAt: new Date(),
        updatedAt: new Date(),
        active: true,
      },
    ];
  }
  openGroups: { [key: string]: boolean } = {};
  groupContacts: { [key: string]: Contact[] } = {};

  toggleGroup(groupId: string): void {
    this.groupsService.GetContactsFromGroupId(groupId).subscribe({
      next: (response) => {
        this.openGroups[groupId] = !this.openGroups[groupId];
        if (response?.data?.contacts?.length) {
          this.groupContacts[groupId] = response.data.contacts;
        }
      },
      error: (response) => {
        this.toastService.showToast(
          'error',
          'Oh no! Something went wrong',
          this.toastService.getErrorMessage(response)
        );
      },
    });
  }

  changeArrow(groupId: string): string[] {
    return this.openGroups[groupId] ? ['invert', 'vertically'] : [];
  }

  getStoredContacts(groupId: string): Contact[] {
    return this.groupContacts[groupId] || [];
  }
}
