import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './authService/authServcie';
import { ResouceConstant } from './constant/resouceConstant';
import { data } from 'jquery';
import { ModalService } from './modals/messageModal/modalService';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Management Resource';
  formLogin: FormGroup = new FormGroup({
    email: new FormGroup(''),
    password: new FormGroup('')
  })
  email: string;
  password: string;
  alertLogin = true;
  menus: any = [];
  filteredMenus: any [] = [];
 
  userData: any;
  constructor(private modalService:ModalService,private authService: AuthService,private router: Router, private formBuilder: FormBuilder){
    this.init()
  }

  loadMenu() {
    this.filteredMenus = []
    this.menus = ResouceConstant.menus;
    // const userData = this.authService.getLoginResponse();
    let useRole = "ROLE_DEFAULT";
    let userPermissions = []
    if(this.userData != null){
      useRole = this.userData.role;
      userPermissions = this.userData.permissions;
      // console.log(useRole)
      // console.log(userPermissions)
    }
    this.menus.forEach((m: any) =>{
        const isRolePresent = m.roles.find((role: any) => role === useRole || userPermissions.some((permission: any) => permission === role));
        if(isRolePresent != undefined){
          this.filteredMenus.push(m)
        }
        
    })
    if (useRole !== "ROLE_DEFAULT") {
      this.filteredMenus.push({
          path: 'infor',
          text: 'Thông tin',
          roles: []
      });
  }
  }

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', Validators.required]
    })
    // this.modalService.getTokenExpiredSubject().subscribe(tokenExpired => {
    //   if (tokenExpired) {
    //     this.modalService.openLoginModal(); // Hiển thị modal khi token hết hạn
    //   }
    // });
  }

  init(){
    this.userData = this.authService.getLoginResponse();
    this.loadMenu()
  }

  checkForm = false;

  onSubmit() {
    this.checkForm = true;
    if (this.formLogin.valid) {
      this.authService.login(this.email, this.password).subscribe(
        (response) => {
          this.authService.setLoginResponse(response);
          this.init();
          this.router.navigate(['/infor']);
        },
        (error) => {
          this.alertLogin = false
          console.error('Login failed', error);
        }
      );
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.formLogin.controls;
  }

  logout(){
    this.authService.logout();
    this.init();
    this.alertLogin = true
    this.router.navigate(["/"]);
  }

}
