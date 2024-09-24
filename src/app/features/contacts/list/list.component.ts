import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Contact } from '../../../shared/models/Contact';

@Component({
  selector: 'app-contacts-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.less',
})
export class ContactsListComponent implements OnInit {
  contacts: Contact[] = [];
  ngOnInit(): void {
    console.log('test');
  }
}
