import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable,map,of} from 'rxjs';




const httpOptions ={
  headers:new HttpHeaders({'Content-Type':'Application/json'})
}
const apiUrl = 'http://localhost:8081/api/v1/roles';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(private httpClient:HttpClient) { }
  getAllRole():Observable<any[]>{
    return this.httpClient.get<any[]>(apiUrl).pipe(
    )
  }

  createCustomRole(name: string, listPermissionId: number[]): Observable<any> {
    const body = {
      name: name,
      listPermissionId: listPermissionId
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.post<any>(`${apiUrl}/customRole`, body);
  }

}
