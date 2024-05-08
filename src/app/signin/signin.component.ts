

import { Component, AfterViewInit, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../Model/User';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements AfterViewInit {


  ngAfterViewInit() {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');
    signUpButton?.addEventListener('click', () => {
      container?.classList.add('right-panel-active');
    });

    signInButton?.addEventListener('click', () => {
      container?.classList.remove('right-panel-active');
    });
  }


  constructor(private api: UserService,private router: Router) { }

  user = new User();



  onRegisterSubmit() {
    this.user.role = 'client'
    this.api.registerUser(this.user).subscribe(response => {
      console.log(response);
    })
  }
  
  login() {
    this.api.login(this.user.email,this.user.password).subscribe(data => {
     console.log(data)
      this.api.saveToken('token', data.token)
      this.api.saveToken('email-user', data.email)
      this.api.saveToken('userId', data.userId)
      //this.router.navigate(['/client']);

      console.log("test aa")
      console.log(data.role)
    
      if (data.role === 'Admin') {
        console.log(data.role);
        this.router.navigate(['/admin']);
        this.api.saveToken('role', data.role)
        this.api.setIsLoggedInadmin(true)

      } else if (data.role === 'Client') {
        this.api.saveToken('role', data.role)
        this.api.setIsLoggedIn(true)
        this.router.navigate(['/client']);
      }else {
        console.log("test finished")
      }

    },
    (error: any) => {
      // Handle login error
      console.error('Login error:', error);
    }
  );
}
}

//ta7et baad ma nsetii token methode
