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

  uploadImage(imageFile: File) {
    const formData = new FormData();
    formData.append('image', imageFile, imageFile.name);
    return this.http.post<any>('https://localhost:7064/api/Product', formData);
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.uploadImage(file).subscribe(
        response => {
          console.log('Image uploaded successfully', response);
          this.imageUrl = URL.createObjectURL(file); // Mettre à jour l'URL pour afficher l'aperçu
        },
        error => {
          console.error('Failed to upload image', error);
          alert("Failed to upload image");
        }
      );
    }
  }
  

  onSubmit() {
    const articleData = new FormData();

    articleData.append('nom', this.article.name);
    articleData.append('description', this.article.description);

    articleData.append('category', this.article.category);
    articleData.append('prix', String(this.article.price));


    this.articleService.CreateProductAsync(articleData).subscribe(
      response => {
        console.log(articleData)
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
