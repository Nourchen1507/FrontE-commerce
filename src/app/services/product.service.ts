import { Injectable, Pipe } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = "Product"
  baseApiUrl : string = environment.apiUrl
  appurl : string = 'https://localhost:7064';

  private categoryName: string = '';



  getCategory(): string {
    return this.categoryName;
  }

  setCategory(newCategory: string): void {
    this.categoryName = newCategory;
  }


  getToken(name:string): string | null {
    return localStorage.getItem(name);
  }

  saveToken(name:string ,token: string): void {
    localStorage.setItem(name , token);
  }


  constructor(private http: HttpClient) {}



  CreateProductAsync(article: FormData): Observable<any> {

    return this.http.post(`${environment.apiUrl}/Product`, article);
  }

  GetAllProductsAsync(): Observable<any> {
    const data= { nom:'', description:'', prix:'' } ;
    return this.http.get(`${environment.apiUrl}/${this.url}`);
  }



  getProductsByCategoryId(categoryId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/category/${categoryId}`);
  }

 
  getProductsByCategoryName(categoryName: string): Observable<any> {
    return this.http.get<any>(`${this.appurl}/categoryByName/${categoryName}`);
  }
  deleteProduct(productId:any): Observable<any> {
    const data={
      idarticle:productId
    }
    return this.http.post(`${environment.apiUrl}/Product/delete`,data);
  }

}


