import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthorizationService } from '../../shared/services/auth/authorization.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../shared/services/toast/toast.service';

interface ValidationRule {
  name: string;
  text: string;
  pattern: RegExp | Function;
  isValid: boolean;
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.less',
})
export class SignupComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthorizationService,
    private router: Router,
    private toastService: ToastService
  ) {}

  signupForm!: FormGroup;

  validationRules: ValidationRule[] = [
    {
      name: 'pwHasLowerCase',
      text: 'Contém pelo menos uma letra minúscula',
      isValid: false,
      pattern: /[a-z]/,
    },
    {
      name: 'pwHasUpperCase',
      text: 'Contém pelo menos uma letra maiúscula',
      isValid: false,
      pattern: /[A-Z]/,
    },
    {
      name: 'pwHasNumber',
      text: 'Contém pelo menos um número',
      isValid: false,
      pattern: /\d/,
    },
    {
      name: 'pwIsValidLength',
      text: 'Pelo menos 8 caracteres',
      isValid: false,
      pattern: (password: string) => password.length >= 8,
    },
    {
      name: 'pwHasOnlyAcceptedChars',
      text: 'Contém apenas caracteres validos (letras e números)',
      isValid: false,
      pattern: /^[0-9a-zA-Z]+$/,
    },
  ];

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/contacts');
    }

    const nameValidations = [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]+$'),
      Validators.minLength(3),
      Validators.maxLength(20),
    ];
    const emailValidations = [Validators.required, Validators.email];
    const passwordValidations = [
      Validators.required,
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$'),
      Validators.pattern('^[0-9a-zA-Z]+$'),
      Validators.minLength(8),
    ];

    this.signupForm = this.formBuilder.group({
      name: ['', Validators.compose(nameValidations)],
      email: ['', Validators.compose(emailValidations)],
      password: ['', Validators.compose(passwordValidations)],
    });
  }

  get name() {
    return this.signupForm.get('name');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  signup() {
    const signupValues = this.signupForm.value;
    if (!signupValues.email || !signupValues.password || !signupValues.name) {
      this.showErrorToast({ message: 'Missing required information' });
      console.log('missing required information');
      return;
    }

    this.authService
      .signup(signupValues.name, signupValues.email, signupValues.password)
      .subscribe({
        next: (response) => {
          this.authService.setSession(response);
          this.router.navigateByUrl('/contacts');
        },
        error: (response) => {
          this.showErrorToast(response);
        },
      });
  }

  checkPasswordValidity() {
    const password = this.signupForm.get('password')?.value || '';

    this.validationRules.forEach((rule) => {
      if (typeof rule.pattern === 'function') {
        rule.isValid = rule.pattern(password);
      } else {
        rule.isValid = rule.pattern.test(password);
      }
    });
  }

  handleValidationColors(rule: ValidationRule): string {
    return rule.isValid
      ? 'validation-item checked'
      : 'validation-item not-checked';
  }

  handleValidationImage(rule: ValidationRule): string {
    return rule.isValid ? 'assets/chb-check.png' : 'assets/chb-error.png';
  }

  handleSignUpButtonDisabled(): boolean {
    return (
      !this.signupForm.valid ||
      !this.validationRules.every((rule) => rule.isValid)
    );
  }

  showErrorToast(error: Record<string, any>) {
    console.log(error);
    const message =
      error?.['error']?.['error']?.['message'] ||
      error?.['error']?.['message'] ||
      error?.['message'] ||
      'Something went wrong!';
    console.log('message :>> ', message);
    this.toastService.showToast(
      'error',
      'Oh no! An wild error has appeared',
      message
    );
  }
}
