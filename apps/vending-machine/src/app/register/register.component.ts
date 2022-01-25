import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  ILoginResponse,
  IRegisterResponse,
} from '@vending-machine/api-interfaces';
import { AuthService } from '../core/auth/auth.service';
import { ToastService } from '../shared/services/toast.service';
import { LoginService } from '../core/services/login.service';

@Component({
  selector: 'vending-machine-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private loginService: LoginService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
    });
  }

  register() {
    if (this.registerForm.valid) {
      this.loginService
        .register({
          username: this.registerForm.get('username')?.value,
          password: this.registerForm.get('password')?.value,
          role: this.registerForm.get('role')?.value,
        })
        .subscribe({
          next: () => {
            this.toastService.showSuccess(
              'Great news!',
              'Your account has been create. Please log in!'
            );

            this.router.navigate(['/login']);
          },
          error: () => {
            this.toastService.showError(
              'Whoops!',
              'An error ocurred during registration'
            );
          },
        });
    } else {
      this.toastService.showError(
        'Whoops!',
        'You seem to be missing some required fields'
      );
    }
  }

  // register() {}
}
