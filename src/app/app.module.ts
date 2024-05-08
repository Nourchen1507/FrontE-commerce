import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SigninComponent } from './signin/signin.component';
import { RegisterComponent } from './register/register.component';
import { UserService } from './services/user.service';

import { ClientdashComponent } from './clientdash/clientdash.component';
import { DhashboardComponent } from './dhashboard/dhashboard.component';
import { IndexComponent } from './dhashboard/index/index.component';
import { ListusrComponent } from './dhashboard/listusr/listusr.component';
import { AdduserComponent } from './dhashboard/adduser/adduser.component';
import { ListcommandeComponent } from './dhashboard/listcommande/listcommande.component';
import { AccountComponent } from './account/account.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ListarticleComponent } from './dhashboard/listarticle/listarticle.component';
import { AddarticleComponent } from './dhashboard/addarticle/addarticle.component';
import { CheckComponent } from './check/check.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    NavbarComponent,
    SigninComponent,
    RegisterComponent,
    ClientdashComponent,
    DhashboardComponent,
    IndexComponent,
    ListusrComponent,
    AdduserComponent,
    ListcommandeComponent,
    AccountComponent,
    ResetpasswordComponent,
    ListarticleComponent,
    AddarticleComponent,
    CheckComponent,
  
 

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
