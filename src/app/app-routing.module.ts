import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guard/auth.guard';
import { AdminGuard } from './guard/admin.guard';
import { SigninComponent } from './signin/signin.component';
import { ClientdashComponent } from './clientdash/clientdash.component';
import { DhashboardComponent } from './dhashboard/dhashboard.component';
import { IndexComponent } from './dhashboard/index/index.component';
import { ListusrComponent } from './dhashboard/listusr/listusr.component';





const routes: Routes = [

  { path: '', redirectTo: "/home", pathMatch: "full" },
  
  {
    path: "home", component: HomeComponent
  },
  
  {path:'login',component:SigninComponent},
  {path:'client',component:ClientdashComponent},
  {path:'admin',component:DhashboardComponent,children:[
    {path:'',redirectTo:'index',pathMatch:'full'},
    {path:'index',component:IndexComponent},
    {path:'listeuser',component:ListusrComponent},
  ]},
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
