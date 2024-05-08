import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/Model/Order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-listcommande',
  templateUrl: './listcommande.component.html',
  styleUrls: ['./listcommande.component.css',
  '../../../assets/css/bootstrap.min.css'
  ]
})
export class ListcommandeComponent implements OnInit {
  
  orders : Order[] = [];

  constructor(private orderservice:OrderService){}

  liste:any[]=[]

  ngOnInit(): void {

    this.orderservice.getAllOrdersAsync().subscribe({
         next: (orders) => {
 
          this.orders = orders;
 
         }, error:(response) => {
 
           console.log(response);
           
         }
 
    });
 
   }

}


  


  
  
  

