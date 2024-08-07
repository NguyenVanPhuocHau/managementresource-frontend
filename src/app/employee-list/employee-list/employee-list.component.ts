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
import { AuthService } from '../../service/authService/authServcie';
@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [AddUserModalComponent, DataTablesModule, CommonModule, FormsModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit, OnDestroy,
  AfterViewInit {
  @ViewChild(AddUserModalComponent) modal?: AddUserModalComponent
  datas: Employee[] = [];
  dtoptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  dttrigger: Subject<any> = new Subject<any>();
  styleModal: string = "null";
  isDetailMode: boolean = false;
  currentUser: Employee = new Employee();
  units: Unit[] = []
  constructor(private authService: AuthService, private employeeService: EmployeeService, private unitService: UnitService) { }
  canDelete: boolean;
  canEdit: boolean;
  canAdd: boolean;
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
        { width: "3%", data: 'id' },
        { width: "27%", data: 'fullName' },
        { width: "27%", data: 'email' },
        { width: "8%", data: 'role' },
        { width: "15%", },
        { width: "27%", },
      ],
    };
    this.getAll();
    this.getAllUnits();
    this.canDelete = this.hasPermission('REMOVE_USER');
    this.canEdit = this.hasPermission('EDIT_USER');
    this.canAdd = this.hasPermission('ADD_USER');
  }
  hasPermission(permiss: string): boolean {
    const permissions = this.authService.getLoginResponse()?.permissions;
    return permissions ? permissions.includes(permiss) : false;
  }
  ngAfterViewInit(): void {
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  getAll2() {
    this.employeeService.getAll().subscribe((res: any) => {
      this.datas = res;
      this.refreshTable();
    })
  }
  getAll() {
    this.employeeService.getAll().subscribe((res: any) => {
      this.datas = res;
      console.log(this.datas)
      this.dtTrigger.next(null);
    })
  }
  getAllUnits() {
    this.unitService.getAllUnit().subscribe((res: any) => {
      this.units = res;
    })
  }
  deleteUser(id: number) {
    this.employeeService.deleteEmployee(id)
      .subscribe(
        data => {
          this.getAll2()
        },
        error => console.log(error));
  }
  dtElement!: DataTableDirective;
  displayedData: any[] = [];
  add() {
    this.styleModal = "null"
    this.open()
  }
  open() {
    this.modal?.openModal();
  }
  detail(id: number) {
    this.styleModal = "detail"
    this.modal?.openModal();
    this.employeeService.getUserById(id).subscribe((res: any) => {
      this.currentUser = res
    })
  }
  onUpdate(id: number): void {
    this.styleModal = "update";
    this.employeeService.getUserById(id).subscribe((res: any) => {
      this.currentUser = res
    })
    console.log(this.currentUser)
    this.open()
  }
  offUpdateMode() {
    this.styleModal = "null";
  }
  onSelectChange(event: any, idUser: number) {
    const selectedUnitId = event.target.value;
    alert("change")
    this.employeeService.changeUnitofUser(idUser, selectedUnitId).subscribe((res: any) => {
      this.getAll2()
    }
    )
  }
  trackByFn(index: any, item: any) {
    return item.id;
  }
  refreshTable(delay: number = 1000): void {
    const table = $('#userListTable').DataTable();
    table.destroy()
    this.dtTrigger.next(null)
  }
  refreshTable2() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.clear().rows.add(this.datas).draw();
    });
  }
}