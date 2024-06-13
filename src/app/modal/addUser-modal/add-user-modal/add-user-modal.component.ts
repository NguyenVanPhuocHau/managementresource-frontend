import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../../employee/employee.service';
import { Employee } from '../../../employee/employee';
// @ts-ignore
const $: any = window['$']
@Component({
  selector: 'app-add-user-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-user-modal.component.html',
  styleUrl: './add-user-modal.component.css'
})
export class AddUserModalComponent implements OnInit{
  @ViewChild('modal') modal?: ElementRef;
  @Input() parentMethod!: () => void;

  openModal(){
    $(this.modal?.nativeElement).modal('show');
  }

  closeModal(){
    $(this.modal?.nativeElement).modal('hide');
  }

  closeModalAfterDelay(delay: number = 1000) {
    setTimeout(() => {
      this.closeModal();  
      this.submitted = true;
    }, delay);
  }

  submitted = false;
  massage = true;
  employee: Employee = new Employee();

  constructor(private router: Router,
    private employeeService: EmployeeService) { }

  ngOnInit() {
   
  }

  newEmployee(): void {
    this.submitted = false;
    this.employee = new Employee();
  }

  save() {
    this.employeeService.createEmployee(this.employee)
      .subscribe(data => {console.log(data);this.parentMethod;  this.closeModalAfterDelay()}, error => console.log(error));
    this.employee = new Employee();

    
  }

  onSubmit() {
    this.submitted = true;
    this.save();   
  
  }

  gotoList() {
    this.router.navigate(['/employees']);
  }

}
