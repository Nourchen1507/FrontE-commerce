import { Component,ElementRef,HostListener,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Product } from '../Model/Product';
import { User } from '../Model/User';
//import { ProductService } from '../services/Product.service';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-clientdash',
  templateUrl: './clientdash.component.html',
  styleUrls: ['./clientdash.component.css',
  '../../assets/css/aprycot.min.css',
'../../assets/css/core/libs.min.css'
 

]
  })
export class ClientdashComponent implements OnInit {
  constructor(private http:HttpClient,
    private api:UserService,
    private user:UserService,
    private elementRef: ElementRef,
      private router:Router
    , private route : ActivatedRoute,
    private article:ProductService) {}


  liste : Product[]=[]
  categoryName =''
  num=0
  listeuser: any[] = []; 


  ngOnInit():void{
  const email = this.api.getToken("email-user");
  const id = this.api.getToken('userId');


  console.log(id)
  this.api.getUsers(id).subscribe(data => {
    console.log(data);
    this.listeuser = Array.isArray(data) ? data : [data];
    console.log(this.listeuser); 
  });
}
  Listetobuy:Product[]=[]
  // Your component code
  idlinkarticle=0  
  selectedSupplements: any[] = []; // Array to store selected supplement IDs
  selectedArticle: any = {}; // Store the selected article information
  
    openModal(article: any) {
      this.selectedArticle = article; // Store the selected article information
      // Open the modal
    }

    check=false
  toggleSelected(idsupplement: number, checked: boolean) {
    console.log(idsupplement,checked);
  
    if (checked) {
      this.Listetobuy.map(x=>{
        //this.idlinkarticle=x.id
      })
      this.selectedSupplements.push(idsupplement);
      console.log(this.selectedSupplements,this.idlinkarticle);
  
    } else {
      const index = this.selectedSupplements.indexOf(idsupplement);
      if (index !== -1) {
        this.selectedSupplements.splice(index, 1);
      }
    }
  }

  cartTotal: number = 0;
  Cart(x: Product): void {
    const existingItem = this.Listetobuy.find(item => item.id === x.id);
    if (existingItem) {
      console.log("Item already exists in cart.");
    } else {
      const cart = document.getElementById('cart');
      const button = document.getElementById('addtocart');
  
      this.cartTotal++;
  
      button?.classList.add('sendtocart');
      setTimeout(() => {
        button?.classList.remove('sendtocart');
        cart?.classList.add('shake');
        this.cartTotal = this.cartTotal; // Update to trigger data binding
        setTimeout(() => {
          cart?.classList.remove('shake');
        }, 500);
      }, 1000);
  
      console.log("Item added to cart.");
      this.Listetobuy.push({ ...x });
      // Save data to localStorage
      localStorage.setItem('Listetobuy', JSON.stringify(this.Listetobuy));
    }
  
  }
  showAlert() {
    alert("Please add items to your cart.");
  }
  setCategory(type: any, v: boolean) {
    this.article.getProductsByCategoryName(type).subscribe(data => {
      this.val = v;
      this.liste = data;
      console.log(data);
    });
  }
  val=false
  getcateg(){
    this.val=true
  }
  showBackToTop: boolean = false;
  
    @HostListener('window:scroll', ['$event'])
    checkScroll() {
      this.showBackToTop = window.pageYOffset > 100; // Adjust the threshold as needed
    }
  
    scrollToCategory(): void {
      const categoryElement = this.elementRef.nativeElement.querySelector('#category');
      if (categoryElement) {
        categoryElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
    productCount=0
    registerProduct() {
    
      this.productCount += 1;
    }

    addToCart() {
      const cart = document.getElementById('cart');
      const button = document.getElementById('addtocart');
  
      this.cartTotal++;
  
      button?.classList.add('sendtocart');
      setTimeout(() => {
        button?.classList.remove('sendtocart');
        cart?.classList.add('shake');
        this.cartTotal = this.cartTotal; // Update to trigger data binding
        setTimeout(() => {
          cart?.classList.remove('shake');
        }, 500);
      }, 1000);
    }
    logout(){
      this.user.logout()
      this.router.navigate(['/login'])
    }
}

