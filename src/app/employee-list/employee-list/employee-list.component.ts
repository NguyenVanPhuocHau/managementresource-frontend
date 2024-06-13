import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../../employee/employee';
import { EmployeeService } from '../../employee/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})

  //  employees: Employee[] = [
  //   { id: 1, firstName: 'John', lastName: 'Doe', emailId: 'john.doe@example.com', active: true},
  //   { id: 2, firstName: 'Jane', lastName: 'Smith', emailId: 'jane.smith@example.com', active: true },
  //   { id: 3, firstName: 'Michael', lastName: 'Johnson', emailId: 'michael.johnson@example.com', active: true }
  // ];

  export class EmployeeListComponent implements OnInit {
    datas:Employee[]=[];

    constructor(private employeeService: EmployeeService) { }
  
    ngOnInit(): void {
      this.getAll();
    }
  
    getAll(){
      this.employeeService.getAll().subscribe((res:any)=>{
        this.datas = res
      })
    }
    deleteUser(id: number){
      this.employeeService.deleteEmployee(id)
      .subscribe(
        data => {
          console.log(data);
          this.getAll()
        },
        error => console.log(error));
    }
  }