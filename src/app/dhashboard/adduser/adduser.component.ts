import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Model/User';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css',
  '../../../assets/css/bootstrap.min.css'
  ]
})
export class AdduserComponent implements OnInit {


  constructor (private userservice: UserService){

  }

  ngOnInit(){
    console.log("this is register component");
  }
  
  user=new User()


  onRegisterSubmit(){
    this.userservice.registerUser(this.user).subscribe(response=>{
      console.log(response);
      alert("success")
    })
  }
}