import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { take } from 'rxjs';
import { LoginService } from '../../core/services/login.service';
import { ToastService } from '../../shared/services/toast.service';
// import { ToastService } from '../../shared/services/toast.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class SocketDataService {
  constructor(
    private socket: Socket,
    private authService: AuthService,
    private loginService: LoginService,
    private toastService: ToastService
  ) {
    if (this.authService.isAuthenticated) {
      this.socket.connect();
      const user = this.authService.getUser();
      console.log('emitting session', user?.id);
      this.socket.emit('session', user?.id);

      // Subscribe to all required events
      this.subscribeToEvents();
    }
  }

  joinedRoom(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.socket.fromEvent('joined').subscribe({
        next: (data: any) => {
          resolve(data.toString());
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  }

  subscribeToEvents() {
    this.handleMultipleLoginsEvent();
    this.handleForceLogout();
  }

  handleMultipleLoginsEvent() {
    return new Promise((resolve, reject) => {
      this.socket.fromEvent('multipleLogins').subscribe({
        next: (data: any) => {
          console.log('TOO MANY LOGINS');

          this.toastService
            .showInfo(
              'Jeepers!',
              'There is already an active session using your account. Click here to terminate all sessions.',
              {
                disableTimeOut: true,
              }
            )
            .onTap.pipe(take(1))
            .subscribe({
              next: () => {
                this.loginService.signOutAllUsers().subscribe();
              },
            });
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  }

  handleForceLogout() {
    return new Promise((resolve, reject) => {
      this.socket.fromEvent('forceLogout').subscribe({
        next: () => {
          this.toastService.showWarning('You are being logged out');
          this.loginService.signOut();
          resolve(true);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  }
}
