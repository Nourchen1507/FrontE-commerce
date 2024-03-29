import { Injectable, Pipe } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
//import axios from 'axios';
import { catchError } from 'rxjs/operators';
import { User } from '../Model/User';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = "Users"

  constructor(private http: HttpClient) {}


  getuser(): Observable<User[]> {
    
    return    this.http.get<User[]>(`${environment.apiUrl}/${this.url}`);
   
   
  }
}