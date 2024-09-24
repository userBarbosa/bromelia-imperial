import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// CORE - non business
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { LoginComponent } from "./core/login/login.component";

// FEATURES - business

// SHARED

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent {
  title = 'bromelia-imperial';
}
