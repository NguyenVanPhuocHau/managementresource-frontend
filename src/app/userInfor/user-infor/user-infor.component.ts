import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/authService/authServcie';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-user-infor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-infor.component.html',
  styleUrl: './user-infor.component.css'
})
export class UserInforComponent implements OnInit{
  userLogin: any;  
  constructor(private authService: AuthService){}
  ngOnInit(): void {
    this.userLogin = this.authService.getLoginResponse();
  }
}
