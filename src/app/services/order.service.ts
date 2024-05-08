import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class  OrderService {

    private url = "Order"
    baseApiUrl : string = environment.apiUrl
  

    constructor(private http: HttpClient) {}

    getAllOrdersAsync(): Observable<any> {
      return this.http.get(`${environment.apiUrl}/${this.url}`);
    }
  
   
    GetOrdersByUserIdAsync(userId : string ): Observable<string>{

      return this.http.get<any>(`${environment.apiUrl}/${this.url}`, {params : { 'userId': userId } })
    }


  }



