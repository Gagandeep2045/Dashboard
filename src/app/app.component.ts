import { Component } from '@angular/core';
import {Router } from '@angular/router'
import { ComponentCommunicatorService } from './component-communicator.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { DataService } from './data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';


 constructor(private r: Router,private communicator:ComponentCommunicatorService,private ds:DataService)
 {

  this.r.navigate(['/login'])
 }

username:String

logout()
{ 

  this.communicator.loginStatus(null)
  this.r.navigate(['/login']);
  console.log("logout")
}

 ngOnInit()
 {
  this.communicator.os.subscribe(a=>{//console.log(a) ; 
     this.username=a;

    if(a!=null){

      this.ds.getTeamName(this.username).subscribe(a=>
    this.r.navigate(['/functionality','monitor',a,'S']) //on successful authentication load parent component functionality with 
    , err=>console.log(err));  
  
  }

    //html of child coomponent monitoring jobs 
    }) // getting data from login component to app componentS

 }

}
