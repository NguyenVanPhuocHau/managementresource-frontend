import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; 
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../service/authService/authServcie';
import { MessageModal } from './messageModal';
import { Router } from '@angular/router';
@Injectable({
    providedIn: 'root'
  })
  export class ModalService {
    private isTokenExpiredSubject = new BehaviorSubject<boolean>(false); 
    constructor(private dialog: MatDialog, private authService: AuthService, private router: Router ) {
    }
    getTokenExpiredSubject() {
      return this.isTokenExpiredSubject.asObservable();
    }
    updateTokenExpiredStatus(isExpired: boolean) {
      this.isTokenExpiredSubject.next(isExpired);
    }
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