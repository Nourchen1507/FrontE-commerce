import { Injectable, Pipe } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from '../Model/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = "Users"
  baseApiUrl : string = environment.apiUrl

  constructor(private httpclient: HttpClient) {}



  login(email:any, password :any): Observable<any> {
    return this.httpclient.post(`${environment.apiUrl}/Auth/login`,{email,password});
  }

  deleteUser(email: string, id: string): Observable<any> {
    const accessToken = this.getToken('token');
  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + accessToken });
    const options = { headers: headers };
    const requestBody = { email: email, iduser: id };
  
    return this.httpclient.delete<any>(`${environment.apiUrl}/${id}`, { ...options, body: requestBody });
  }
  
 
  getuser(): Observable<any> {
    const data = {id:''}
    return this.httpclient.post(`${environment.apiUrl}/${this.url}`,data);
  }
  
  getUsers(id: any): Observable<any> {
    return this.httpclient.get(`${environment.apiUrl}/${this.url}/${id}`);
  }
  
  GetAllUsers(): Observable<User[]>{
   return this.httpclient.get<User[]>(this.baseApiUrl + '/users')
  }

  registerUser(user: any): Observable<any> {
    return this.httpclient.post(`${environment.apiUrl}/${this.url}`, user);
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

  update(user: any): Observable<any> {
    const data = {
      userId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      adresseId: user.adresseId,
      email: user.email,
      phone: user.phone,
      localisation: user.localisation,
      password: user.password
    };
    const accessToken = this.getToken('token');
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + accessToken });

    return this.httpclient.post(`${environment.apiUrl}/Users/update`, data, { headers: headers });
  }
}

