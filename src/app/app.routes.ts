import {  Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list/employee-list.component';
import { UnitListComponent } from './unit-list/unit-list/unit-list.component';



export const routes: Routes = [
    { 'path': '', redirectTo: 'employee', pathMatch: 'full' },
    { 'path': '', 'title': "User management", component: EmployeeListComponent },
    { 'path': 'users', 'title': "User management", component: EmployeeListComponent },
    { 'path': 'units', 'title': "Unit management", component:  UnitListComponent},

];