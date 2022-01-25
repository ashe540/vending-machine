import { Component, OnInit } from '@angular/core';
import { AuthTokenData } from '@vending-machine/api-interfaces';
import { AuthService } from '../../../core/auth/auth.service';
import { LoginService } from '../../../core/services/login.service';

@Component({
  selector: 'vending-machine-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  user: AuthTokenData | null;

  constructor(
    private authService: AuthService,
    private loginService: LoginService
  ) {
    this.user = this.authService.getUser();
  }

  // ngOnInit() {}

  public logout(): void {
    this.loginService.signOut();
  }
}
