import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Employee } from '../../employee/employee';
import { EmployeeService } from '../../employee/employee.service';
import { Router } from '@angular/router';
import { AddUserModalComponent } from '../../modal/addUser-modal/add-user-modal/add-user-modal.component';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import DataTables, { Config } from 'datatables.net';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [AddUserModalComponent, DataTablesModule, CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})

  //  employees: Employee[] = [
  //   { id: 1, firstName: 'John', lastName: 'Doe', emailId: 'john.doe@example.com', active: true},
  //   { id: 2, firstName: 'Jane', lastName: 'Smith', emailId: 'jane.smith@example.com', active: true },
  //   { id: 3, firstName: 'Michael', lastName: 'Johnson', emailId: 'michael.johnson@example.com', active: true }
  // ];

  export class EmployeeListComponent implements OnInit {
    @ViewChild(AddUserModalComponent) modal?: AddUserModalComponent
    datas:Employee[]=[];
    dtoptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject<any>();
    dttrigger:Subject<any>=new Subject<any>();
    styleModal: string = "null";
    isDetailMode: boolean = false;
    currentUser: null;

    constructor(private employeeService: EmployeeService) { }
  
    ngOnInit(): void {
      
      this.dtoptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
        destroy: true, // Thêm tùy chọn này để cho phép hủy và khởi tạo lại DataTable,\
        columns: [
          { data: 'id' },
          { data: 'fullName' },
          { data: 'email' },
          { data: 'role' },
          // { orderable: false, searchable: false, defaultContent: '' }
          {
            data: null,
            defaultContent: `
              <button id="hau" class="btn btn-danger">Delete</button>
             
            `,
            orderable: false
          }
        ]
      };

      drawCallback: (settings) => {
        // Lấy tham chiếu đến DataTable
        const api = new $.fn.dataTable.Api(settings);
        // Thêm sự kiện click cho button
        $('#userListTable tbody').on('click', 'button.btn-danger', function() {
          alert("Button clicked!");
        });
      }
  
   
      this.getAll();
    }

    ngOnDestroy(): void {
      this.dtTrigger.unsubscribe();
    }

    getAll2(){
      this.employeeService.getAll().subscribe((res:any)=>{
        this.datas = res;
    
      })
    }
  
    getAll(){
      this.employeeService.getAll().subscribe((res:any)=>{
        this.datas = res;
      this.dtTrigger.next(null); // Thông báo DataTables để khởi tạo với dữ liệu mới
      // this.updateDisplayedData();
      })
    }
    deleteUser(id: number){
      this.employeeService.deleteEmployee(id)
      .subscribe(
        data => {
        
          this.datas = this.datas.filter(item => item.id !== id); // Xóa hàng khỏi dữ liệu
          this.refreshTable()
        
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

 


  

  
    trackByFn(index: any, item: any) {
      return item.id;
    }

    
    refreshTable(): void {
      const table = $('#userListTable').DataTable();
      table.clear();
      table.rows.add(this.datas)
      table.draw();
    }

    

    //  adjustedData = this.datas.map(item => {
    //   return {
    //     id: item.id,
    //     fullName: item.fullName,
    //     email: item.email,
    //     role: item.role,
    //     // Nếu có các dữ liệu khác cần được thêm vào
    //     additionalData: '...',
    //     // Hoặc bạn có thể bỏ qua cột Actions nếu không cần thiết
    //   };
    // });
    
   
   
  }