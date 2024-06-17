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

  getUserById(id: number):Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(`${apiUrl}/${id}`).pipe(
    )
  }
  updateUser(updatedUser: Employee): Observable<any> {
    return this.httpClient.put(`${apiUrl}/updateUser`, updatedUser);
  }

  
  getUsersByIds(ids: number[]): Observable<any> {
    return this.httpClient.post<any>(`${apiUrl}/getByIds`, ids);
  }

  getUserByUnitId(id: number): Observable<any> {
    return this.httpClient.get<any>(`${apiUrl}/units/${id}`);
  }

  changeUnitofUser(idUser: number, idUnit: number): Observable<any> {
    return this.httpClient.put<any>(`${apiUrl}/changeUnit`,{idUser, idUnit

    })
  }




}

