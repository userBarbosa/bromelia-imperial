import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts-card',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.less',
})
export class ContactsCardComponent {
  @Input()
  contact!: {
    id: string;
    name: string;
    phone: string;
    email: string;
  };

  constructor(private router: Router) {}

  navigateToEdit() {
    this.router.navigate(['/contacts/', this.contact.id, "edit"]);
  }
}
