import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable,map,of} from 'rxjs';
import { Unit } from './unit';



const httpOptions ={
  headers:new HttpHeaders({'Content-Type':'Application/json'})
}
const apiUrl = 'http://localhost:8081/api/v1/units';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  constructor(private httpClient:HttpClient) { }

  getAll(pageNo: number): Observable<any> {
    const params = {
      pageNo: pageNo.toString(),
    };
    return this.httpClient.get<any>(`${apiUrl}/pages`, { params });
  }
  checkUnitName(name: string): Observable<boolean> {
    return this.httpClient.get<{ name: string }[]>(`${apiUrl}`).pipe(
      map(units => units.some(unit => unit.name === name))
    );
  }

  createUnit(unit: Object): Observable<Object> {
    return this.httpClient.post(`${apiUrl}/createUnit`, unit);
  }

  deleteUnit(id: number): Observable<any>{
    return this.httpClient.delete(`${apiUrl}/deleteUnit/${id}`, { responseType: 'text' })
  }

  updateUnit(updatedUnit: Unit): Observable<any> {
    return this.httpClient.put(`${apiUrl}/updateUnit`, updatedUnit);
  }

  getUnitById(id: number):Observable<Unit[]>{
    return this.httpClient.get<Unit[]>(`${apiUrl}/${id}`).pipe(
    )
  }

  getAllUnit():Observable<Unit[]>{
    return this.httpClient.get<Unit[]>(apiUrl).pipe(
    )
  }

  


}
