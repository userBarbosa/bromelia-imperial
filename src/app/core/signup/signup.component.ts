import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthorizationService } from '../../shared/services/auth/authorization.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.less',
})
export class SignupComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthorizationService,
    private router: Router
  ) {}

  signupForm!: FormGroup;

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/contacts');
    }
    const emailValidations = [Validators.required, Validators.email];
    this.signupForm = this.formBuilder.group({
      email: ['', Validators.compose(emailValidations)],
      password: ['', Validators.required],
    });
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  signup() {
    const signupValues = this.signupForm.value;
    if (!signupValues.email || !signupValues.password) {
      console.log('missing required information');
      return;
    }

    this.authService
      .signup(signupValues.email, signupValues.password)
      .subscribe((response) => {
        this.authService.setSession(response);
        this.router.navigateByUrl('/contacts');
      });
  }
}
