import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { setUser } from '../global';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;
  warning: boolean = false;
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    // console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      try {
        this.loginService.login(this.loginForm.value).then((data) => {
          if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('roleId', data.roleId);

            this.router.navigate(['/courses']).then(() => {
              window.location.reload();
            });
          } else {
            this.warning = true;
          }
        });
      } catch (err) {
        console.error({ msg: 'user not exist' });
      }
    }
  }

  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }
}
