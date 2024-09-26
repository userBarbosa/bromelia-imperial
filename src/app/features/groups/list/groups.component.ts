import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Group } from '../../../shared/models/Group';

@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.less',
})
export class GroupsListComponent {
  groups: Group[] = [
    {
      id: '66f5b85ef0d422f8d8a150bf',
      name: 'Group 1',
      description: 'Description 1',
      members: [{ userId: '66f5b7e60c2734dd23828cc4', isAdmin: true }],
      createdBy: '66f5b7e60c2734dd23828cc4',
      updatedBy: '66f5b7e60c2734dd23828cc4',
      createdAt: new Date(),
      updatedAt: new Date(),
      active: true,
    },
  ];
  openGroups: { [key: string]: boolean } = {};

  toggleGroup(groupId: string): void {
    this.openGroups[groupId] = !this.openGroups[groupId];
  }

  changeArrow(groupId: string): string[] {
    return this.openGroups[groupId] ? ['invert', 'vertically'] : [];
  }
}
