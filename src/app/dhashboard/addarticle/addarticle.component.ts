import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Product } from 'src/app/Model/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-addarticle',
  templateUrl: './addarticle.component.html',
  styleUrls: ['./addarticle.component.css',
  '../../../assets/css/bootstrap.min.css'
  ]
})
export class AddarticleComponent {


  article = new Product

  constructor(
   
    private articleService: ProductService, private http:HttpClient) {

  }
  imageUrl : string = '';

  //uploadImage() {
   // const body = { imageUrl: this.imageUrl };
    //const headers = new HttpHeaders().set('Content-Type', 'application/json');
    //return this.http.post<any>('https://localhost:7064/api/Product', body, { headers });
  //}
 // onFileSelected(event: any) {
    //const file = event.target.files[0];
    //if (file) {
     // this.imageUrl = URL.createObjectURL(file);
    // }
 // }
 
  onSubmit() {
    const articleData = new FormData();
    articleData.append('nom', this.article.name);
    articleData.append('description', this.article.description);

    articleData.append('category', this.article.category);
    articleData.append('prix', String(this.article.price));

    //articleData.append('image', this.article.imageUrl);

    this.articleService.CreateProductAsync(articleData).subscribe(
      response => {
        alert("Article added successfully")
        console.log('Article added successfully', response);
        // Do something after successful article addition
      },
      error => {
        alert("Failed to add article")
        console.error('Failed to add article', error);
        // Handle error
      }
    );
  }

}
