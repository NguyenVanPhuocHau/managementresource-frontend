import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-login-modal',
  template: `
    <div class="message-modal-container">
      <div class="message-modal-content">
        <h2>Hết phiên</h2>
        <p>Vui lòng đăng nhập lại.</p>
        <button mat-button (click)="close('logout')">Đồng ý</button>
      </div>
    </div>
  `,
  styles: [`
    .message-modal-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.5);
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 9999;
    }
    .message-modal-content {
      background-color: white;
      padding: 20px;
      width: 400px;
      border-radius: 8px;
      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
    }
  `]
})
export class MessageModal {
  constructor(public dialogRef: MatDialogRef<MessageModal>) {}
  close(action: string): void {
    this.dialogRef.close(action);
  }
}
