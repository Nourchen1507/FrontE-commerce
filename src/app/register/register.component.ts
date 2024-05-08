import { Component, OnInit } from '@angular/core';
import { User } from '../Model/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{


  constructor(private userservice : UserService) {}
  ngOnInit(){
    console.log("this is register component");
  }



  user=new User()
  onRegisterSubmit(){
    this.user.role='Client'
    this.userservice.registerUser(this.user).subscribe(response=>{
      console.log(response);
    })
  }
  }

