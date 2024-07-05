import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../../employee/employee.service';
import { Employee } from '../../../employee/employee';
import { UnitService } from '../../../unit/unit.service';
import { Unit } from '../../../unit/unit';
import { customer } from '../../../models/customer';
import { AuthService } from '../../../service/authService/authServcie';
import { CustomerService } from '../../../service/customerService';
import { ExistingEmailsService } from '../../../service/email-service/existing-emails.service';
// @ts-ignore
const $: any = window['$']
@Component({
  selector: 'app-add-customer-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-customer-modal.component.html',
  styleUrl: './add-customer-modal.component.css'
})
export class AddCustomerModalComponent implements OnInit {
  @ViewChild('modal') modal?: ElementRef;
  @Input() styleModal: string;
  @Input() listUser: any[];
  @Input() currentCustomer: any;
  @Output() freshpage = new EventEmitter<void>();
  @Output() offUpdateMode = new EventEmitter<void>();
  myForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    problem: new FormControl(''),
  });
  myUpdateForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    phone: new FormControl(''),
    problem: new FormControl(''),
  });
  openModal() {
    $(this.modal?.nativeElement).modal('show');
    this.chekform = false
    this.myForm.reset()
    this.myUpdateForm.reset()
  }
  closeModal() {
    $(this.modal?.nativeElement).modal('hide');
  }
  closeModalAfterDelay(delay: number = 1000) {
    setTimeout(() => {
      this.closeModal();
    }, delay);
    setTimeout(() => {
      this.submitted = false;
      this.chekform = false;
    }, delay + 300);
  }
  submitted = false;
  chekform = false
  massage = true;
  customer: customer = new customer();
  constructor(private router: Router,
  private authService: AuthService, private customerService: CustomerService, private formBuilder: FormBuilder, private userService: EmployeeService, private exitEmailService: ExistingEmailsService) {
  }
  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', {
        validators: [Validators.required, Validators.email],
        asyncValidators: [this.exitEmailService.validateEmailCus()],
        updateOn: 'blur'
      }],
      phone: ['', Validators.required],
      problem: ['', Validators.required],
    });
    this.myUpdateForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      phone: ['', Validators.required],
      problem: ['', Validators.required],
    });
  }
  newCustomer(): void {
    this.submitted = false;
    this.customer = new customer();
  }
  save() {
    const userId = this.authService.getLoginResponse()?.id;
    if (userId !== undefined) {
        this.customer.userId = userId;
    } else {
        console.error('User ID is undefined');
        return;
    }
    console.log(this.authService.getLoginResponse()?.token)
    this.customerService.createCustomer(this.customer)
      .subscribe(data => { console.log(data); this.freshpage.emit(); this.closeModalAfterDelay() }, error => console.log(error));
    this.customer = new customer();
    this.chekform = false;
  }
  update(id: number) {
    this.customerService.updateCustomer(this.currentCustomer)
      .subscribe(data => { console.log(data); this.freshpage.emit(); this.offUpdateMode.emit(); this.closeModalAfterDelay() }, error => console.log(error));
    this.currentCustomer = new customer();
  }
  onSubmit() {
    this.chekform = true;
    console.log(this.myForm.valid)
    if (this.myForm.valid) {
      this.submitted = true
      if (this.styleModal == "update") {
        this.update(this.currentCustomer.id);
      } else {
        // this.customer.userId = this.userId;
        this.save();
      }
      this.myForm.reset()
    }
  }
  onSubmitUpdate() {
    this.chekform = true;
    console.log(this.myForm.valid)
    if (this.myUpdateForm.valid) {
      this.submitted = true
        this.update(this.currentCustomer.id);
      this.myForm.reset()
    }
  }
  onReset(): void {
    this.submitted = false;
    this.myForm.reset();
    this.myUpdateForm.reset();
  }
  get f(): { [key: string]: AbstractControl } {
    return this.myForm.controls;
  }
  get f1(): { [key: string]: AbstractControl } {
    return this.myUpdateForm.controls;
  }
}
