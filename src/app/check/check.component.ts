import { Component, OnInit } from '@angular/core';
import { Order } from '../Model/Order';
import { User } from '../Model/User';
import { AdresseClient } from '../Model/Adresseclient';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AddressService } from '../services/address.service';
import { Product } from '../Model/Product';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css', 
   '../../assets/css/aprycot.min.css',
  '../../assets/css/core/libs.min.css'

  ]
})
export class CheckComponent implements OnInit {


  constructor(
    private api: UserService,
    private addressService: AddressService,
    private userService: UserService,
    private orderService: OrderService,
    private router: Router
  ) {}




  hidden=false
  listeadd:Product[]= [];
  data: any;
  liste: User[] = [];
  listeadresse:any[]=[]
  user = new User();
  listeordors:any[]=[];
  orders = new Order();
  

  address = new AdresseClient();
  val = false;



  ngOnInit(): void {

    
    const storedData = localStorage.getItem('Listetobuy');
    const retrievedList = JSON.parse(String(storedData));
    this.listeadd = retrievedList;
    this.listeadd.map(x=>{
      x.qte=1
    })
    const id = this.api.getToken('userId');
    
  
    if (id !== null) { // Vérification que id n'est pas null
      // Utilisation de id pour récupérer les données de l'utilisateur
      this.api.getUsers(id).subscribe((data: any) => {
        console.log(data);
         
        if (Array.isArray(data)) {
          this.liste = data;
        } else {
          this.liste = [data];
        }
        console.log(this.liste); 
      });
    }
    
}
pdfUrl!:any
show=false
total=0
montantht=0
montantttc=0
orderid=0
totalarticle=0
//facture= new Facture()

calculateTotal(x: any): number {
  return x.price * x.quantity;
}
printPDF(pdfUrl: string) {
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  iframe.src = pdfUrl;
  document.body.appendChild(iframe);

  iframe.onload = () => {
    iframe.contentWindow?.print();
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000); // Adjust the delay as needed
  };
}
addcommande() {

  
  const idarticleArray = this.liste
  .map(item => item.id);

  // Initialize total to 0
 

  // Calculate total by iterating through the liste array
  this.listeadd.forEach(item => {
    this.totalarticle += item.price * item.qte;

  });
  this.total = this.totalarticle+ this.totalsupp
  // Calcul du montant HT et TTC
  this.montantht = this.totalarticle / (1 + 10); // Supposons que le taux de TVA est de 10%
  this.montantttc = this.totalarticle / (1 + 0.5); // Supposons que le taux de TVA est de 5%

  // Préparation des détails de la commande
  this.orders.orderDate = new Date();
  const articleDetails = this.listeadd.map(item => ({
    idarticle: item.id,
    qte: item.qte,
  }));

  this.orders.orderItems = articleDetails;
  this.orders.userId = String(localStorage.getItem("userId"));
console.log(this.id)
 console.log(this.orders)
console.log("couuucccccccouuu")

  this.orders.orderItems = articleDetails;
  // Récupération de l'ID utilisateur depuis localStorage
  console.log("testttttt")
  //console.log(this.userId)

  // Envoi de la commande via le service
  this.orderService.createOrder( this.id,this.orders).subscribe(

    (response: any) => {
      console.log(this.id)
      console.log(response);
      alert("success");
      this.orderid = response;
      this.hidden = true;
      this.show = true;
      this.orders.code_promo = '';
      this.orders.NotePourLivreur = '';

    },
    (error: HttpErrorResponse) => {
      console.error('Error generating PDF:', error);
    }
  );
}

id!:any
getidarticle(x:any){
this.listeadd.map(a=>{
  if(a.id==x.id){
    this.id=x.id
  }
})
}
private cart: any[] = [];
 totalsupp=0

getCart(): any[] {
  return this.cart;
}
removeFromList(item: any) {
  const index = this.liste.findIndex(e => e.id === item.id);
  
  if (index !== -1) {
    this.liste.splice(index, 1); // Remove the item from the array
    localStorage.setItem('Listetobuy', JSON.stringify(this.liste)); // Update localStorage
  }

  if (this.liste.length === 0) {
    this.hidden = true;
  }
}

logout() {
  this.userService.logout();
  this.router.navigate(['/login']);
}


}

  