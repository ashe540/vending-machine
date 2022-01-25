import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';
import { SocketDataService } from '../core/services/socket-data.service';

@Component({
  selector: 'vending-machine-modules',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  userRole = '';

  constructor(
    private authService: AuthService,
    private socketDataService: SocketDataService
  ) {
    if (this.authService.isAuthenticated) {
      this.socketDataService
        .joinedRoom()
        .then((data) => {
          console.log('Joined Room', data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  ngOnInit() {
    this.userRole = this.authService.getRole();
    console.log(this.userRole);
  }
}
