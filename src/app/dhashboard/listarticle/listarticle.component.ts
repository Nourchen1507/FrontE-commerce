import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core'
import { Product } from 'src/app/Model/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-listarticle',
  templateUrl: './listarticle.component.html',
  styleUrls: ['./listarticle.component.css',
  '../../../assets/css/bootstrap.min.css'
  ]
})
export class ListarticleComponent implements OnInit{


  constructor(  private articleService: ProductService, private http:HttpClient){}


   liste:any[]=[]
   imageUrl : string = '';


   
ngOnInit(): void {
    this.articleService.GetAllProductsAsync().subscribe(data=>{
      console.log(data);
      this.liste=data
    })
}


article=new Product()

f=false
edit(id:number,f:boolean){
  this.f=f
  this.liste.map(x=>{
    if(id==x.idarticle){
      this.article=x
    }
  })
}
//uploadImage() {
  //const body = { imageUrl: this.imageUrl };
  //const headers = new HttpHeaders().set('Content-Type', 'application/json');
  //return this.http.post<any>('https://localhost:7064/api/Product', body, { headers });
//}
//onFileSelected(event: any) {
 // const file = event.target.files[0];
  //if (file) {
  //  this.imageUrl = URL.createObjectURL(file);
  

}
