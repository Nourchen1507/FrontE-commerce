

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
    this.user.role = 'client'
    this.userservice.registerUser(this.user).subscribe(response => {
      console.log(response);
    })
  }
  login() {
    this.userservice .login(this.user).subscribe(data => {
      this.userservice .saveToken('email-user', data.user.email)

      this.userservice .saveToken('id-user', data.user.id)

      this.userservice .saveToken('token', data.token)
    

      if (data.user.role === 'admin') {
        this.router.navigate(['/admin']);
        this.userservice.saveToken('role', data.user.role)
        this.userservice.setIsLoggedInadmin(true)

      } else if (data.user.role === 'client') {
        this.userservice.saveToken('role', data.user.role)
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




