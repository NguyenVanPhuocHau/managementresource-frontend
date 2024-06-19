import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../../employee/employee.service';
import { Employee } from '../../../employee/employee';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Unit } from '../../../unit/unit';
import { ExistingEmailsService } from '../../../email-service/existing-emails.service';
// @ts-ignore
const $: any = window['$']
@Component({
  selector: 'app-add-user-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-user-modal.component.html',
  styleUrl: './add-user-modal.component.css'
})
export class AddUserModalComponent implements OnInit{
  @ViewChild('modal') modal?: ElementRef;
  @Input() styleModal: string;
  @Input() currentUser: any; 
  @Input() units: Unit[]; 
  @Output() parentMethod = new EventEmitter<void>();
  @Output() offUpdateMode = new EventEmitter<void>();
  errorEmail: string;
  myForm: FormGroup = new FormGroup({
    fullName: new FormControl(''),
    email: new FormControl(this.customEmailValidator),
    role: new FormControl(''),
    unitId: new FormControl('')
  });
  openModal(){
    $(this.modal?.nativeElement).modal('show');
    this.chekform = false
    this.myForm.reset()
  }

  closeModal(){
    $(this.modal?.nativeElement).modal('hide');

  }

  closeModalAfterDelay(delay: number = 1000) {
    setTimeout(() => {
      this.closeModal();  
    }, delay);
    setTimeout(() => {
      this.submitted = false;
      this.chekform = false;
    }, delay+300);
    
  }

  submitted = false;
  chekform = false
  massage = true;
  employee: Employee = new Employee();

  constructor(private router: Router,
    private employeeService: EmployeeService,private formBuilder: FormBuilder, private exitEmailService: ExistingEmailsService) {
      
     }

  ngOnInit(): void{
  
    this.myForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', {
        validators: [Validators.required, Validators.email],
        asyncValidators: [this.exitEmailService.validateEmail()],
        updateOn: 'blur'
      }],
      role: ['', Validators.required],
      unitId: ['', Validators.required],
     
    });
  }

   customEmailValidator(control: AbstractControl) {
    const email: string = control.value;
    if (!this.employeeService.checkEmail(email)) {
      return { invalidEmail: true };
    }
    return true;
  }
  


  

  newEmployee(): void {
    this.submitted = false;
    this.employee = new Employee();
  }

  save() {
    console.log(this.employee)
    this.employeeService.createEmployee(this.employee)
      .subscribe(data => {console.log(data);this.parentMethod.emit();  this.closeModalAfterDelay()}, error => console.log(error));
     
    this.employee = new Employee();
    this.chekform = false;
    
  }

  update(id: number){
    console.log(this.currentUser)
    this.employeeService.updateUser(this.currentUser)
      .subscribe(data => {console.log(data);this.parentMethod.emit(); this.offUpdateMode.emit(); this.closeModalAfterDelay()}, error => console.log(error));
      this.currentUser = new Employee();
    
      
  }

  onSubmit() {
    this.chekform = true;
    console.log(this.myForm.valid)
    if (this.myForm.valid) {
     this.submitted = true 
    if(this.styleModal == "update"){
      this.update(this.currentUser.id);  
    }else{
      console.log(this.employee)
      this.save(); 
    }
    
  }
 
}

markFormGroupTouched(formGroup: FormGroup) {
  Object.values(formGroup.controls).forEach(control => {
    control.markAsTouched();

    if (control instanceof FormGroup) {
      this.markFormGroupTouched(control);
    }
  });
} 

get f(): { [key: string]: AbstractControl } {
  return this.myForm.controls;
}

onReset(): void{
  this.submitted = false;
  this.myForm.reset();
}

getUnitNameById(id: number): string {
  const unit = this.units.find(u => u.id === id);
  return unit ? unit.name : 'Unknown'; 
}


onUnitSelect(event: any) {
 alert(event.target.value) // Lưu giá trị của select vào biến tạm
}


}
