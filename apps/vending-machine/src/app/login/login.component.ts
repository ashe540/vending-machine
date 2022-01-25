import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILoginResponse } from '@vending-machine/api-interfaces';
import { AuthService } from '../core/auth/auth.service';
import { ToastService } from '../shared/services/toast.service';
import { LoginService } from '../core/services/login.service';

@Component({
  selector: 'vending-machine-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private loginService: LoginService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    if (this.authService.isAuthenticated) {
      this.router.navigate(['/app']);
    }
  }

  login() {
    const usernameField = this.loginForm.get('username');
    const passwordField = this.loginForm.get('password');

    if (usernameField && passwordField && this.loginForm.valid) {
      this.loginService
        .login(usernameField.value, passwordField.value)
        .subscribe({
          next: (data: ILoginResponse) => {
            this.authService.saveToken(data.token);

            this.router.navigate(['/app']);
          },
          error: (err) => {
            console.log(err);
            let message = 'Invalid credentials';

            if (err?.err?.message) {
              message += ': ' + err?.err.message;
            }
            this.toastService.showError('Whoops!', message);
          },
        });
    } else {
      this.toastService.showError(
        'Whoops!',
        'You seem to be missing some fields'
      );
    }
  }

}
