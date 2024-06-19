import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Employee } from '../../employee/employee';
import { EmployeeService } from '../../employee/employee.service';
import { Router } from '@angular/router';
import { AddUserModalComponent } from '../../modal/addUser-modal/add-user-modal/add-user-modal.component';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import DataTables, { Config } from 'datatables.net';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { CommonModule } from '@angular/common';
import { Unit } from '../../unit/unit';
import { UnitService } from '../../unit/unit.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [AddUserModalComponent, DataTablesModule, CommonModule, FormsModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})

  //  employees: Employee[] = [
  //   { id: 1, firstName: 'John', lastName: 'Doe', emailId: 'john.doe@example.com', active: true},
  //   { id: 2, firstName: 'Jane', lastName: 'Smith', emailId: 'jane.smith@example.com', active: true },
  //   { id: 3, firstName: 'Michael', lastName: 'Johnson', emailId: 'michael.johnson@example.com', active: true }
  // ];

  export class EmployeeListComponent implements OnInit, OnDestroy, 
  AfterViewInit{
    @ViewChild(AddUserModalComponent) modal?: AddUserModalComponent
    datas:Employee[]=[];
    dtoptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject<any>();
    dttrigger:Subject<any>=new Subject<any>();
    styleModal: string = "null";
    isDetailMode: boolean = false;
    currentUser: null;
    units:Unit[]=[]

    constructor(private employeeService: EmployeeService, private unitService: UnitService) { }
  
    ngOnInit(): void {
      
      this.dtoptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
        processing: true,
        responsive: true, 
        destroy: true, 
        scrollY: '330px', 
        scrollCollapse: false, 
        columns: [
          { width: "3%",  data: 'id' },
          { width: "25%", data: 'fullName' },
          { width: "27%",data: 'email' },
          { width: "7%",data: 'role' },
          { width: "15%", },
          { width: "25%", },
        ],
      };
      this.getAll();
      this.getAllUnits();
    }

    ngAfterViewInit(): void {
      
    }

    ngOnDestroy(): void {
      this.dtTrigger.unsubscribe();
    }

    getAll2(){
      this.employeeService.getAll().subscribe((res:any)=>{
      
        this.datas = res;
        this.refreshTable();
        
      })
    }
  
    getAll(){
      this.employeeService.getAll().subscribe((res:any)=>{
        this.datas = res;
        console.log(this.datas)
        this.dtTrigger.next(null); 
      })
    }
    getAllUnits(){
      this.unitService.getAllUnit().subscribe((res:any)=>{
        this.units = res;
        
      })
    }

    deleteUser(id: number){
      this.employeeService.deleteEmployee(id)
      .subscribe(
        data => {
        
         
          this.getAll2()
        
        },
        error => console.log(error));
      

    }
    dtElement!: DataTableDirective;

    displayedData: any[] = [];
    add(){
      this.styleModal = "null"
      this.open()
    }

    open(){
      this.modal?.openModal();
    }

    detail(id: number){
      this.styleModal = "detail"
      this.modal?.openModal();
      this.employeeService.getUserById(id).subscribe((res:any)=>{
        this.currentUser = res
      })
   
    }

    onUpdate(id: number): void {
      this.styleModal = "update";
      this.employeeService.getUserById(id).subscribe((res:any)=>{
        this.currentUser = res
      })
      console.log(this.currentUser)
      this.open()
    }

    offUpdateMode(){
     this.styleModal = "null";
   
    }
   
    onSelectChange(event: any, idUser: number) {
      const selectedUnitId = event.target.value;
     
      this.employeeService.changeUnitofUser(idUser,selectedUnitId).subscribe((res:any) =>{
        this.getAll2()
      }

      )

      
    }


 


  

  
    trackByFn(index: any, item: any) {
      return item.id;
    }

    
  refreshTable(delay: number = 1000): void {
    
    const table = $('#userListTable').DataTable();
    // // table.clear();
    // // table.rows.add(this.datas);
    // // table.draw();
    // table.clear()
    table.destroy()
    this.dtTrigger.next(null)
    // console.log(this.datas);
    // table.rows.add(this.datas).draw(false); // Add new data
    // table.columns.adjust().draw(false);
  }

    refreshTable2() {
      
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.clear().rows.add(this.datas).draw();
      });
    }


   
   
  }