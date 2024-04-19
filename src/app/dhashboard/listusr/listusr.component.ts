import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-listusr',
  templateUrl: './listusr.component.html',
  styleUrls: ['./listusr.component.css']
})


export class ListusrComponent implements OnInit {
  
  
  constructor(private service:UserService){}
  
  liste:any[]=[]

  ngOnInit(): void {

    this.service.getuser().subscribe(data=>{

      console.log(data.supplements);

     this.liste=data
     console.log(this.liste);

    })
}
}
