import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable,map,of} from 'rxjs';
import { customer } from '../models/customer';




const httpOptions ={
  headers:new HttpHeaders({'Content-Type':'Application/json'})
}
const apiUrl = 'http://localhost:8081/api/v1/customers';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private httpClient:HttpClient) { }
  getAllCustomer():Observable<any[]>{
    return this.httpClient.get<any[]>(apiUrl).pipe(
    )
  }
  checkEmail(email: string): Observable<boolean> {
    return this.httpClient.get<{ email: string }[]>(`${apiUrl}`).pipe(
      map(users => users.some(user => user.email === email))
    );
  }
  deleteCustomer(id: number): Observable<any>{
    return this.httpClient.delete(`${apiUrl}/deleteCustomer/${id}`, { responseType: 'text' })
  }

  createCustomer(employee: Object): Observable<Object> {
    return this.httpClient.post(`${apiUrl}/addCustomer`, employee);
  }

  getCustomerById(id: number):Observable<customer[]>{
    return this.httpClient.get<customer[]>(`${apiUrl}/get/${id}`).pipe(
    )
  }
  updateCustomer(updatedUser: customer): Observable<any> {
    return this.httpClient.put(`${apiUrl}/updateCustomer`, updatedUser);
  }


}
