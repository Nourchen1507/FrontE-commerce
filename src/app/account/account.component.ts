
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
  val = false;
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
  
  email:any
   delete(email:any){
    console.log(email);
    const id=String(this.api.getToken("user"))

     this.api.deleteUser(email,id).subscribe(data=>{
      alert("success")
      console.log(data);

     })
   }

  edit(id: number, f: boolean) {
    this.val = f;
    
  }

  close(f: boolean) {
    this.val = f;
  }

  onSubmit() {
    this.address.iduser= String(this.api.getToken('userId'));
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.address.latitude = position.coords.latitude;
          this.address.longitude = position.coords.longitude;
          this.addressService.addaddress(this.address).subscribe(() => {
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
    this.addressService.getAllUsersInAdresse(id).subscribe((data: any) => {
      this.user = data;
    });
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}




