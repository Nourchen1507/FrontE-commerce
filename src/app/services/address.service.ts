import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})


export class AddressService {


    private url = "Adresse"
  baseApiUrl : string = environment.apiUrl

  saveToken(name:string ,token: string): void {
    localStorage.setItem(name , token);
  }

  getToken(name:string): string | null {
    return localStorage.getItem(name);
  }

  constructor(private http: HttpClient) {}


  addaddress(commande:any):Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${environment.apiUrl}/adresse/add`, commande,{ headers});
  }

  getAllUsersInAdresse(id: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(`${environment.apiUrl}/Adresse/${id}/users`, { headers });
  }
  getCommande(userId: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/User/${userId}/commande`);
  }
  updateaddress(commande:any):Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${environment.apiUrl}/Order`, commande,{ headers});
  }

  deleteaddress(id:any):Observable<any> {
    const data = {
      idadresse:id
    }
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${environment.apiUrl}/adresse/delete`, data,{ headers});
  }
}