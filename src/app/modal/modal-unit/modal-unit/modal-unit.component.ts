import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../../employee/employee.service';
import { Employee } from '../../../employee/employee';
import { UnitService } from '../../../unit/unit.service';
import { Unit } from '../../../unit/unit';
import { ExistingEmailsService } from '../../../service/email-service/existing-emails.service';
// @ts-ignore
const $: any = window['$']
@Component({
  selector: 'app-modal-unit',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './modal-unit.component.html',
  styleUrl: './modal-unit.component.css'
})
export class ModalUnitComponent implements OnInit{
  @ViewChild('modal') modal?: ElementRef;
  @Input() styleModal: string;
  @Input() listUser: any[];
  @Input() currentUnit: any; 
  @Output() freshpage = new EventEmitter<void>();
  @Output() offUpdateMode = new EventEmitter<void>();
  myForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
  });;
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
  unit: Unit = new Unit();
  constructor(private router: Router,
    private unitservice: UnitService,private formBuilder: FormBuilder, private userService: EmployeeService, private exitEmailService: ExistingEmailsService) {
     }
  ngOnInit(): void{
    this.myForm = this.formBuilder.group({
      name: ['', 
        {validators: [Validators.required],
          asyncValidators: [this.exitEmailService.validateNameUnit()],
          updateOn: 'blur'}
      ],
      description: ['', Validators.required]
    });
  }
  newEmployee(): void {
    this.submitted = false;
    this.unit = new Unit();
  }
  save() {
    this.unitservice.createUnit(this.unit)
      .subscribe(data => {console.log(data);this.freshpage.emit();  this.closeModalAfterDelay()}, error => console.log(error));
    this.unit = new Unit();
    this.chekform = false;
  }
  update(id: number){
    this.unitservice.updateUnit(this.currentUnit)
      .subscribe(data => {console.log(data);this.freshpage.emit(); this.offUpdateMode.emit(); this.closeModalAfterDelay()}, error => console.log(error));
      this.currentUnit = new Unit();
  }
  onSubmit() {
    this.chekform = true;
    console.log(this.myForm.valid)
    if (this.myForm.valid) {
     this.submitted = true
    if(this.styleModal == "update"){
      this.update(this.currentUnit.id);
    }else{
      this.save(); 
    }
    this.myForm.reset()
  }
}
onReset(): void{
  this.submitted = false;
  this.myForm.reset();
}
get f(): { [key: string]: AbstractControl } {
  return this.myForm.controls;
}
}
