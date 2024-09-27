import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { FABService } from '../../services/floating-action-button/fab.service';

@Component({
  selector: 'app-fab',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './fab.component.html',
  styleUrls: ['./fab.component.less'],
})
export class FabComponent {
  isOpen = false;

  constructor(private fabService: FABService, private router: Router) {}

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
    this.isOpen = false;
  }

  get options() {
    return this.fabService.getOptions();
  }
}
