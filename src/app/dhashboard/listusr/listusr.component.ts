import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Model/User';
import { UserService } from 'src/app/services/user.service';




@Component({
  selector: 'app-listusr',
  templateUrl: './listusr.component.html',
  styleUrls: ['./listusr.component.css',
  '../../../assets/css/bootstrap.min.css']
})


export class ListusrComponent implements OnInit {
  
  users : User[] = [];

  constructor(private userservice:UserService){}
  
  liste:any[]=[]

  ngOnInit(): void {

   this.userservice.GetAllUsers()
   .subscribe({
        next: (users) => {

         this.users = users;

        }, error:(response) => {

          console.log(response);
          
        }
   });

  }
}