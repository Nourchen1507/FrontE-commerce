
import { Component, OnInit,Input } from '@angular/core';
import { UserService } from '../services/user.service';

import { Router } from '@angular/router';
import { User } from '../Model/User';
import { AddressService } from '../services/address.service';
import { AdresseClient } from '../Model/Adresseclient';
import { OrderService } from '../services/order.service';
import { Order } from '../Model/Order';
import { OrderItem } from '../Model/OrderItem';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css',
  '../../assets/css/aprycot.min.css',
  '../../assets/css/core/libs.min.css'
]
})
export class AccountComponent implements OnInit {

 

  constructor(
    private api: UserService,
    private addressService: AddressService,
    private userService: UserService,
    private orderService: OrderService,
    private router: Router
  ) {}

  data: any;
  liste: User[] = [];
   listeadresse:any[]=[]
  user = new User();
  listeordors:any[]=[];
  orders = new Order();
  
  address = new AdresseClient();

  ngOnInit(): void {


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
  
      // Utilisation de id pour récupérer les commandes de l'utilisateur
      this.orderService.GetOrdersByUserIdAsync(id).subscribe((orders: string) => {
        console.log(orders);
        if (Array.isArray(orders)){

          this.listeordors = orders;
                } else {
                  this.listeordors =[orders];
                  this.listeordors = [OrderItem];
                }
                console.log(this.listeordors);
        //this.listeordors.push(orders); 
      });
  
      this.fetchAddressData();
    } else {
      console.error('User ID is null.'); 
    }
  }
  deleteaddress(id:any){
    this.addressService.deleteaddress(id).subscribe(data=>{
       alert("success")
     })
  
      const index = this.listeadresse.findIndex(e => e.idadresse === id);
  
      if (index !== -1) {
        this.listeadresse.splice(index, 1); // Remove the item from the array
      }
  
  
  }
  updateadd(){
    this.addressService.updateaddress(this.address).subscribe(data=>{
      console.log(data)
      alert("success")
    })
  }
  editadresse(id:number){
    this.listeadresse.map(x=>{
      if(id==x.idadresse){
        this.address=x
      }
    })
  }
  email:any
   delete(email:any){
    console.log(email);
    const id=String(this.api.getToken("user"))

     this.api.deleteUser(email,id).subscribe(data=>{
      alert("success")
      console.log(data);

     })
   }

    val=false
  edit(id:string,f:boolean){
   this.val=f
   this.liste.map(x=>{
    if(x.id==id){
      this.user=x
    }
   })
  }
  close(f:boolean){
    this.val=f
   }
   update(){

    console.log(this.user);
    this.api.update(this.user).subscribe(data=>{
      alert("success")
      console.log(data);

    })
   }
  
  onSubmit() {
    this.address.id= String(this.api.getToken('userId'));
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.address.latitude = position.coords.latitude;
          this.address.longitude = position.coords.longitude;
          this.addressService.createAdresse(this.address).subscribe(() => {
            alert('Address added successfully');
            this.listeadresse.push(this.address);
          });
        },
        (error) => {
          alert('Error getting geolocation');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser');
    }
  }

  private fetchAddressData() {
    const id = String(this.api.getToken('userId'));
    this.addressService.getAllAdresses().subscribe((data: any) => {
      this.user = data;
    });
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}




