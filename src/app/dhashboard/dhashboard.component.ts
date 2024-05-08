import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';





@Component({
  selector: 'app-dhashboard',
  templateUrl: './dhashboard.component.html',
  styleUrls: ['./dhashboard.component.css']
})
export class DhashboardComponent implements OnInit {


  isSidebarToggled: boolean = false;

  constructor(private userservice:UserService ,private rouetr:Router) { }

  ngOnInit(): void {
  }

  toggleSidebar(): void {
    this.isSidebarToggled = !this.isSidebarToggled;
  }
  logout(){
    this.userservice.logout()
    this.rouetr.navigate(['/login'])
  }










}









