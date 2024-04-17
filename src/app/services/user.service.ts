import { Injectable, Pipe } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../Model/User';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = "Users"

  constructor(private http: HttpClient) {}



  login(user: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/Auth/login`, user);
  }
  getuser(): Observable<any> {
    const data = {iduser:''}
    return this.http.post(`${environment.apiUrl}/${this.url}`, data);
  }

  registerUser(user: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${this.url}`, user);
  }
  private readonly TOKEN_KEY = 'access_token';

  saveToken(name:string ,token: string): void {
    localStorage.setItem(name , token);
  }

  getToken(name:string): string | null {
    return localStorage.getItem(name);
  }
  removeToken() {
    localStorage.removeItem('token');
  }

  isLoggedIn="false"
  setIsLoggedIn(isLoggedIn: boolean) {
    sessionStorage.setItem(this.isLoggedIn, isLoggedIn.toString());

  }
  
  getIsLoggedIn(): boolean {
    const isLoggedInString = sessionStorage.getItem(this.isLoggedIn);
    return isLoggedInString ? JSON.parse(isLoggedInString) : false;
  }

  

  logout() {
    this.removeToken();
    this.setIsLoggedIn(false);
  }

  isUser() {
    const jwtToken = this.getToken('token');
    if (!jwtToken) {
      return false;
    }
    const jwtData = jwtToken.split('.')[1];
    const decodedJwtJsonData = window.atob(jwtData);
    const roles=localStorage.getItem("role")
    return roles;
  }
  isAdmin="false"
  setIsLoggedInadmin(isLoggedIn: boolean) {
    sessionStorage.setItem(this.isAdmin, isLoggedIn.toString());

  }

  getIsLoggedInadmin(): boolean {
    const isLoggedInString = sessionStorage.getItem(this.isAdmin);
    return isLoggedInString ? JSON.parse(isLoggedInString) : false;
  }
}
