import { Component, OnInit, ViewChild } from '@angular/core';
import { Unit } from '../../unit/unit';
import { UnitService } from '../../unit/unit.service';
import { CommonModule } from '@angular/common';
import { ModalUnitComponent } from '../../modal/modal-unit/modal-unit/modal-unit.component';
import { EmployeeService } from '../../employee/employee.service';
import { CustomerService } from '../../service/customerService';
import { AddCustomerModalComponent } from '../../modal/addCustomer-modal/add-customer-modal/add-customer-modal.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthService } from '../../authService/authServcie';
@Component({
  selector: 'app-unit-list',
  standalone: true,
  imports: [CommonModule,AddCustomerModalComponent,NgxPaginationModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent implements OnInit{
  @ViewChild(AddCustomerModalComponent) modal?: AddCustomerModalComponent
  datas: any[] = [];
  listUser: any[] = [];
  styleModal: string = "null";
  currentCustomer: null;
  page = 1;
  canDelete: boolean;
  canEdit: boolean;
  canAdd: boolean;
  ngOnInit(): void {
    this.getAllCustomer(); 
    this.canDelete = this.hasPermission('REMOVE_CUSTOMER');
    this.canEdit = this.hasPermission('EDIT_CUSTOMER');
    this.canAdd = this.hasPermission('ADD_CUSTOMER');
  }

  hasPermission(permiss: string): boolean {
    const permissions = this.authService.getLoginResponse()?.permissions;
  return permissions ? permissions.includes(permiss) : false;
  }
  
  constructor(private authService: AuthService,private userService: EmployeeService, private customerService: CustomerService) { }

  getAllCustomer(): void {
    this.customerService.getAllCustomer().subscribe((res: any) => {
      this.datas = res;
      console.log(this.datas)
    });
    
  }

  loadAfterdetete(): void {
   
    // this.unitService.getAll(this.currentPage).subscribe((res: any) => {
    //   this.datas = res.content;
    //   if(this.totalPages ! = res.totalPages){
    //     this.changePage(res.totalPages)
    //   }
    //   this.totalPages = res.totalPages;
      
    // });
    
  }





  changePage(pageNo: number): void {
    // this.currentPage = pageNo;
   
    // this.getAllUnits();
  }

  add(){
      this.styleModal = "null"
     
      this.open();
  }

  open(){
    this.modal?.openModal();
  }

  deleteUnit(id: number){
    this.customerService.deleteCustomer(id)
    .subscribe(
      data => {
        this.getAllCustomer()
      },
      error => console.log(error));
  }

  onUpdate(id: number): void {
    this.styleModal = "update";
    this.customerService.getCustomerById(id).subscribe((res:any)=>{
      this.currentCustomer = res
    })
    console.log(this.currentCustomer)
    this.open()
  }

  getListUserIn(ids: number[]): void{
    this.styleModal = "detail"
   
    this.userService.getUsersByIds(ids).subscribe(
      data => {
        this.listUser = data;
      },
      error => {
        console.error('Error fetching users:', error);
      }
    );
    this.open()
  }

  listUserOfUnit(id: number): void{
    this.styleModal = "detail"
   
    this.userService.getUserByUnitId(id).subscribe(
      data => {
        this.listUser = data;
      },
      error => {
        console.error('Error fetching users:', error);
      }
    );
    this.open()
  }

  




  

}
