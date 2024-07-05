import {  Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list/employee-list.component';
import { UnitListComponent } from './unit-list/unit-list/unit-list.component';
import { NotfoundComponent } from './notfound/notfound/notfound.component';
import { HomeComponent } from './home/home/home.component';
import { UserInforComponent } from './userInfor/user-infor/user-infor.component';
import { CustomerListComponent } from './customer-list/customer-list/customer-list.component';
import { Role } from './models/role';
import { AuthGuard } from './service/authGuardService';
import { CustomRoleComponent } from './customRole/custom-role/custom-role.component';
import { Permission } from './models/enumPermission';
import { SearchComponent } from './search/search/search.component';
export const routes: Routes = [
    { 'path': '', redirectTo: 'employee', pathMatch: 'full' },
    { 'path': '', 'title': "Home", component: HomeComponent },
    { 'path': 'infor', 'title': 'user infor', component: UserInforComponent, canActivate: [AuthGuard], data:{roles: [Role.Admin,Role.Editer,Role.User,Permission.ADD_USER,Permission.EDIT_USER,Permission.REMOVE_USER,Permission.ADD_UNIT,Permission.EDIT_UNIT,Permission.REMOVE_UNIT,Permission.ADD_CUSTOMER,Permission.EDIT_CUSTOMER,Permission.REMOVE_CUSTOMER]}},
    { 'path': 'customRole', 'title': 'custom role', component: CustomRoleComponent, canActivate: [AuthGuard], data:{roles: [Role.Admin]}},
    { 'path': 'users', 'title': "User management", component: EmployeeListComponent,canActivate: [AuthGuard], data:{roles: [Role.Admin,Role.Editer,Permission.ADD_USER,Permission.EDIT_USER,Permission.REMOVE_USER]}},
    { 'path': 'units', 'title': "Unit management", component:  UnitListComponent, canActivate: [AuthGuard], data:{roles: [Role.Admin,Role.Editer,Permission.ADD_UNIT,Permission.EDIT_UNIT,Permission.REMOVE_UNIT]}},
    { 'path': 'error', 'title': "not found", component:  NotfoundComponent},  
    { 'path': 'customers', 'title': "customer management", component: CustomerListComponent, canActivate: [AuthGuard], data:{roles: [Role.Admin,Role.User,Role.Editer,Permission.ADD_CUSTOMER,Permission.EDIT_CUSTOMER,Permission.REMOVE_CUSTOMER]}},
    { 'path': 'search', 'title': "search", component:  SearchComponent} 
];