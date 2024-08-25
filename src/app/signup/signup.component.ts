import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SignupService } from '../signup.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  signUpForm!: FormGroup;
  warning: boolean = false;
  isSubmitting: boolean = false; // Initialize the flag

  constructor(
    private fb: FormBuilder,
    private signupService: SignupService,
    private router: Router
  ) {
    this.signUpForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.minLength(7)]],
      repassword: ['', [Validators.minLength(7)]],
    });
  }

  signup() {
    // Prevent multiple submissions
    if (this.signUpForm.valid && !this.isSubmitting) {
      this.isSubmitting = true; // Set the flag to true

      const body = {
        username: this.signUpForm.value.username,
        password: this.signUpForm.value.password,
      };
      if (this.signUpForm.value.repassword === body.password) {
        this.signupService
          .signup(body)
          .then((data) => {
            localStorage.setItem('token', data.token);
            localStorage.setItem('roleId', data.roleId);
            this.router.navigate(['/courses']);
          })
          .catch((error) => {
            console.error('Signup error:', error);
          })
          .finally(() => {
            this.isSubmitting = false;
          });
      } else {
        this.warning = true;
      }
    }
  }
  get username() {
    return this.signUpForm.get('username');
  }
  get password() {
    return this.signUpForm.get('password');
  }
}
