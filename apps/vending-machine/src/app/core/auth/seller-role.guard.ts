import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserRoles } from '@vending-machine/api-interfaces';
import { AuthService } from './auth.service';

@Injectable()
export class SellerRoleGuard implements CanActivate {
  constructor(
    private readonly auth: AuthService,
    private readonly router: Router
  ) {}

  canActivate(): boolean {
    if (!this.auth.isAuthenticated) {
      this.router.navigateByUrl('/login');
    }
    const role = this.auth.getRole();
    return role === UserRoles.SELLER;
  }
}
