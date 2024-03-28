import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'E-SHOP';
  constructor(private router:Router) {}
  hideNavbar: boolean = false;

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.hideNavbar = ['/login', '/register','/check' ,'/rest','/client','/404','/account'].includes(this.router.url) || this.isNewPasswordRoute() ;
      }
    });
  }
  isNewPasswordRoute(): boolean {
    return this.router.url.startsWith('/admin/') ||this.router.url.startsWith('/submit/')|| this.router.url.startsWith('/client/');
  }

}
