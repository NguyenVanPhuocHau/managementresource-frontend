import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable,catchError,map,of} from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
const httpOptions ={
  headers:new HttpHeaders({'Content-Type':'Application/json'})
}
const apiUrl = 'http://localhost:8081/api/v1/auth';
interface LoginResponse {
    id: number;
    fullName: string;
    email: string;
    role: string;
    token: string;
    permissions: string[];
    type: string;
  }
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient:HttpClient, private cookieService:CookieService) { }
  login(email: string, password: string):Observable<any>{
    return this.httpClient.post<any>(apiUrl+"/login",{email,password})
  }
  setLoginResponse(response: LoginResponse): void {
    this.cookieService.set('login_response', JSON.stringify(response), { path: '/', secure: true, sameSite: 'Lax' });
  }
  getLoginResponse(): LoginResponse | null {
    const loginResponseString = this.cookieService.get('login_response');
    return loginResponseString ? JSON.parse(loginResponseString) : null;
  }
  logout(): void {
    this.cookieService.delete('login_response', '/');
  }
  // isTokenExpired(token: string): boolean {
  //   return this.jwtHelper.isTokenExpired(token);
  // }
}
