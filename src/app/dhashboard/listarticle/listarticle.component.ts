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

onFileSelected(event: any) {
  this.article.image = event.target.files[0];
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

removeFromList(item: any) {
  this.articleService.deleteProduct(item.productId).subscribe()
  const index = this.liste.findIndex(e => e.idarticle === item.productId);

  if (index !== -1) {
    this.liste.splice(index, 1); // Remove the item from the array
  }


}

delete(productId:any){
  console.log(productId);

  this.articleService.deleteProduct(productId).subscribe(data=>{alert("delete")},(error)=>{
    alert("error")
  })}


}