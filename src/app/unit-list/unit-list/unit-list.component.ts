import { Component, OnInit, ViewChild } from '@angular/core';
import { Unit } from '../../unit/unit';
import { UnitService } from '../../unit/unit.service';
import { CommonModule } from '@angular/common';
import { ModalUnitComponent } from '../../modal/modal-unit/modal-unit/modal-unit.component';
import { EmployeeService } from '../../employee/employee.service';
import { AuthService } from '../../authService/authServcie';

@Component({
  selector: 'app-unit-list',
  standalone: true,
  imports: [CommonModule,ModalUnitComponent,ModalUnitComponent],
  templateUrl: './unit-list.component.html',
  styleUrl: './unit-list.component.css'
})
export class UnitListComponent implements OnInit{
  @ViewChild(ModalUnitComponent) modal?: ModalUnitComponent
  datas: Unit[] = [];
  listUser: any[] = [];
  
  totalPages: number;
  currentPage: number = 1;
  styleModal: string = "null";
  currentUnit: null;
  canDelete: boolean;
  canEdit: boolean;
  canAdd: boolean;
  ngOnInit(): void {
   
    this.getAllUnits();
    this.canDelete = this.hasPermission('REMOVE_UNIT');
    this.canEdit = this.hasPermission('EDIT_UNIT');
    this.canAdd = this.hasPermission('ADD_UNIT');
  }

  hasPermission(permiss: string): boolean {
    const permissions = this.authService.getLoginResponse()?.permissions;
  return permissions ? permissions.includes(permiss) : false;
  }

  constructor(private authService: AuthService,private unitService: UnitService, private userService: EmployeeService) { }

  getAllUnits(): void {
   
    this.unitService.getAll(this.currentPage).subscribe((res: any) => {
      this.datas = res.content;
     
      this.totalPages = res.totalPages;
      
    });
    
  }

  loadAfterdetete(): void {
   
    this.unitService.getAll(this.currentPage).subscribe((res: any) => {
      this.datas = res.content;
      if(this.totalPages ! = res.totalPages){
        this.changePage(res.totalPages)
      }
      this.totalPages = res.totalPages;
      
    });
    
  }





  changePage(pageNo: number): void {
    this.currentPage = pageNo;
   
    this.getAllUnits();
  }

  add(){
      this.styleModal = "null"
     
      this.open();
  }

  open(){
    this.modal?.openModal();
  }

  deleteUnit(id: number){
    this.unitService.deleteUnit(id)
    .subscribe(
      data => {
        this.loadAfterdetete()
      },
      error => console.log(error));
  }

  onUpdate(id: number): void {
    this.styleModal = "update";
    this.unitService.getUnitById(id).subscribe((res:any)=>{
      this.currentUnit = res
    })
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
