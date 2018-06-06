import { Component, OnInit } from '@angular/core';
import { ComponentCommunicatorService } from '../component-communicator.service';
import { DataService } from '../data.service';
import { User } from '../model-classes/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private communicator:ComponentCommunicatorService,private ds:DataService) {

    
   }

  
private user:User= new User()
isAuthenticated:boolean
   authenticate()
   {//console.log(name)
   // console.log(pass)
   this.ds.authenticateUser(this.user).subscribe(a=>{
     console.log(a)
     if(a=="true")
{this.isAuthenticated=true
this.communicator.loginStatus(this.user.username); // data going from login component to parent component
}
else{
this.isAuthenticated=false
this.communicator.loginStatus(null);
}},err=>console.log(err))
   }

  ngOnInit() {
  }

}
