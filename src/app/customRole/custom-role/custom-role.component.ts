import { Component, OnInit } from '@angular/core';
import { PermissionService } from '../../service/permissionService';
import { Permission } from '../../service/permission';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoleService } from '../../service/roleService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-custom-role',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './custom-role.component.html',
  styleUrl: './custom-role.component.css'
})
export class CustomRoleComponent implements OnInit{

  constructor(private permissionService: PermissionService,private roleService: RoleService, private router: Router){}
  permissions: Permission[]=[];
  // selectedPermissionIds: number[] = [];
  roleName: string = '';
  ngOnInit(): void {
    this.getAllPer()
  }
  permissionStates: { [key: number]: boolean } = {}; 
  getAllPer(){
    this.permissionService.getAllPermission().subscribe((res:any)=>{
      console.log(res)
      this.permissions = res;
    })
  }

  onSubmit() {
    const selectedPermissionIds = this.permissions.filter(permission => this.permissionStates[permission.id])
    .map(permission => permission.id);
    this.roleService.createCustomRole(this.roleName, selectedPermissionIds)
      .subscribe(
        (response) => {
          console.log('Role created successfully:', response);
          this.router.navigate(['/users']);
          this.resetForm();
        },
        (error) => {
          console.error('Failed to create role:', error);
        }
      );
  }

  resetForm() {
    this.roleName = '';
  }
  
  

}
