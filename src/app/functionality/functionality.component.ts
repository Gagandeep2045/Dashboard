import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {DataService} from '../data.service'
import { ComponentCommunicatorService } from '../component-communicator.service';
@Component({
  selector: 'app-functionality',
  templateUrl: './functionality.component.html',
  styleUrls: ['./functionality.component.css']
})
export class FunctionalityComponent implements OnInit {
username:String
team:String

  constructor(private ar:ActivatedRoute,private ds: DataService,private cs:ComponentCommunicatorService) {

    this.cs.os.subscribe(a=>{this.username=a; //console.log(a);
     
      this.ds.getTeamName(this.username).subscribe(teamname=> {//console.log(teamname);
      this.team=teamname
      
      },err=> console.log(err))
    
    
    })
   }

component:String

  ngOnInit() {

 this.ar.paramMap.subscribe(a=>{//console.log(a )
this.component=a.get("childComponent")

})

  }

}
