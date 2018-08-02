import { Component, OnInit } from '@angular/core';
import {Input} from '@angular/core'
import {DataService} from '../data.service'
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { ActivatedRoute } from '@angular/router';
import {JobReport} from '../../app/model-classes/jobReport'
@Component({
  selector: 'app-monitor-jobs',
  templateUrl: './monitor-jobs.component.html',
  styleUrls: ['./monitor-jobs.component.css']
})
export class MonitorJobsComponent implements OnInit,OnChanges {

  constructor(private ds:DataService,private ar:ActivatedRoute) { 

  }

teams:String[]

@Input()
teamname:String

status:String
  ngOnInit() {
  }

report:JobReport[]
jobNames:Set<String>
jobname:String="All Jobnames"
  ngOnChanges()
  {
    this.ds.getAllTeams().subscribe(a=>{console.log(a); this.teams=a},err=>console.log(err))

    this.ar.paramMap.subscribe(a=>{
      this.teamname=a.get("team");
      this.status=a.get("status")
      console.log(a);
      this.ds.getJobsByTeamAndStatus(this.teamname,this.status).subscribe(a=>{console.log(a)
     this.report=a 
     this.jobNames=new Set<String>()
    this.report.map(a=>a.jobName).forEach(a=>this.jobNames.add(a))
    console.log(this.jobNames)
    }
    )
    
    }
      )
  }

}
