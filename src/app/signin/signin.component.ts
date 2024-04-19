

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

  users = new User()

  constructor(private userservice : UserService,private router: Router) { }




  user = new User()
  onRegisterSubmit() {
    this.user.Role = 'client'
    this.userservice.registerUser(this.user).subscribe(response => {
      console.log(response);
    })
  }
  login() {
      this.userservice.login(this.user).subscribe(data => {
      this.userservice.saveToken('Email', data.Email)

      this.userservice.saveToken('Id', data.Id)

      this.userservice.saveToken('access_token', data.token)
    

      if (data.role === 'admin') {
        this.router.navigate(['/admin']);
        this.userservice.saveToken('role', data.role)
        this.userservice.setIsLoggedInadmin(true)

      } else if (data.role === 'client') {
        this.userservice.saveToken('role', data.role)
        this.userservice.setIsLoggedIn(true)
        this.router.navigate(['/client']);
      }
    },
    (error: any) => {
      // Handle login error
      console.error('Login error:', error);
    }
  );
}

}




