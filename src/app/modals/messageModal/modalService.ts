import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; // Thay thế bằng package modal của bạn
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../authService/authServcie';
import { MessageModal } from './messageModal';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
  })
  export class ModalService {
  
    private isTokenExpiredSubject = new BehaviorSubject<boolean>(false); // BehaviorSubject để lưu trữ trạng thái token hết hạn
  
    constructor(private dialog: MatDialog, private authService: AuthService, private router: Router ) {
    //   this.checkTokenExpiration();
    }
  
    getTokenExpiredSubject() {
      return this.isTokenExpiredSubject.asObservable();
    }
  
   
    updateTokenExpiredStatus(isExpired: boolean) {
      this.isTokenExpiredSubject.next(isExpired);
    }
  
  
    // private checkTokenExpiration() {
    //   const token = this.authService.getLoginResponse()?.token;
    //   if (token) {
    //     const isExpired = this.authService.isTokenExpired(token);
    //     this.updateTokenExpiredStatus(isExpired);
    //   }
    // }
  
    openLoginModal(): void {
      const dialogRef = this.dialog.open(MessageModal, {
        width: '400px',
        disableClose: true 
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result === 'logout') {
          this.authService.logout(); 
          window.location.reload();
        }
      });
    }
  }