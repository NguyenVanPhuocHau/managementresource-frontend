import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable,map,of} from 'rxjs';




const httpOptions ={
  headers:new HttpHeaders({'Content-Type':'Application/json'})
}
const apiUrl = 'http://localhost:8081/api/v1/permissions';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  constructor(private httpClient:HttpClient) { }
  getAllPermission():Observable<any[]>{
    return this.httpClient.get<any[]>(apiUrl).pipe(
    )
  }

 

}
