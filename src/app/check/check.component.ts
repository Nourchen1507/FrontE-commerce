import { Component, OnInit } from '@angular/core';
import { Order } from '../Model/Order';
import { User } from '../Model/User';
import { AdresseClient } from '../Model/Adresseclient';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AddressService } from '../services/address.service';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {


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
    }
    
}
logout() {
  this.userService.logout();
  this.router.navigate(['/login']);
}
}

  