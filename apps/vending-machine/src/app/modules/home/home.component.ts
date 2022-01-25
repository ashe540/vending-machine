import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'vending-machine-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  userRole = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userRole = this.authService.getRole();
  }
}
