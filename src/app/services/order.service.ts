import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class  OrderService {

    private url = "Order"
    baseApiUrl : string = environment.apiUrl
   
   
    saveToken(name:string ,token: string): void {
      localStorage.setItem(name , token);
    }
  
    getToken(name:string): string | null {
      return localStorage.getItem(name);
    }

    constructor(private http: HttpClient) {}

    getAllOrdersAsync(): Observable<any> {
      return this.http.get(`${environment.apiUrl}/${this.url}`);
    }
  
   
    GetOrdersByUserIdAsync(userId : string ): Observable<string>{

      return this.http.get<any>(`${environment.apiUrl}/${this.url}`, {params : { 'userId': userId } })
    }

    createOrder(userId: string, orderDto: any): Observable<any> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const url = `${environment.apiUrl}/Users/Orders`; // URL for creating an order
      
      // Include userId in the request params
      const params = new HttpParams().set('userId', userId);
    
      return this.http.post(url, orderDto, { headers, params });
    }
    
  }



