'use strict';

import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthorizationService } from '../../shared/services/auth/authorization.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less',
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthorizationService,
    private router: Router
  ) {}

  loginForm!: FormGroup;

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {      
      this.router.navigateByUrl('/contacts')
    };
    const emailValidations = [Validators.required, Validators.email];
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose(emailValidations)],
      password: ['', Validators.required],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    const loginValues = this.loginForm.value;
    if (!loginValues.email || !loginValues.password) {
      console.log('missing required information');
      return;
    }

    this.authService
      .login(loginValues.email, loginValues.password)
      .subscribe((response) => {
        this.authService.setSession(response);
        this.router.navigateByUrl('/contacts');
      });
  }
}
