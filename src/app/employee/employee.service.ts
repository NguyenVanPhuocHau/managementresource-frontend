import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable,of} from 'rxjs';
import { Employee } from './employee';


const httpOptions ={
  headers:new HttpHeaders({'Content-Type':'Application/json'})
}
const apiUrl = 'http://localhost:8081/api/v1/users';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient:HttpClient) { }

  getAll():Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(apiUrl).pipe(
    )
  }
  deleteEmployee(id: number): Observable<any>{
    return this.httpClient.delete(`${apiUrl}/deleteUser/${id}`, { responseType: 'text' })
  }

  createEmployee(employee: Object): Observable<Object> {
    return this.httpClient.post(`${apiUrl}/addUser`, employee);
  }


}

