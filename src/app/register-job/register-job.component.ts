import { Component, OnInit } from '@angular/core';
import {Chart } from 'chart.js'
import { Input } from '@angular/core';
import { DataService } from '../data.service';
import { MonitoringJob } from '../model-classes/monitoring-job';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { ChartsService } from '../charts.service';
import {Highcharts} from 'angular-highcharts'
import {Series} from '../model-classes/series'

@Component({
  selector: 'app-register-job',
  templateUrl: './register-job.component.html',
  styleUrls: ['./register-job.component.css']
})
export class RegisterJobComponent implements /*OnInit,*/OnChanges {

  editted:number=-1

  addClicked:boolean

  jobToBeRegistered:MonitoringJob = new MonitoringJob()

  
  
  @Input()
  teamname:String

   jobs:MonitoringJob[]=[]

  constructor(private ds:DataService,private cs:ChartsService) {
    console.log("Consructor")


   }

newSla:number
status:String

jobExists:boolean
cssValidApply:boolean=false

jobAlreadyExists()
{
  this.ds.jobExists(this.jobToBeRegistered.jobName).subscribe(
    a=>{console.log(a) ; if(a=="true") this.jobExists=true;  else this.jobExists=false;
    this.cssValidApply=(!this.jobExists) && (this.jobToBeRegistered.jobName!="")
    
  } ,
  err=>console.log(err),
  ()=>this.status="Existing Job Status Found")
}

   slaChange(job:MonitoringJob)
   {console.log("We are changing sla from"+job.slaTime+" to "+this.newSla+"   ")

let test:boolean=window.confirm("Are you sure you wish to change the sla from"+job.slaTime+" to "+this.newSla+"   ")
console.log(test)
if(test){
//mind job is reference to jobs[index] defined in ngFor in .html file which we pass in slaChange ; so if we make change to this reference
//it will reflect in array
  job.slaTime=this.newSla
//here we are creating new MonitoringJob object; so if we use this code the array wont change and ui will display the earlier sla
   /*let j:MonitoringJob= new MonitoringJob()
   j.jobName=job.jobName
   j.slaTime=this.newSla
   j.teamName=job.teamName*/

   this.ds.updateSla(job).subscribe(
     (updatedJob)=>{console.log("Job has been updated to "+JSON.stringify(updatedJob))},
  err=>{this.status="Updation Failed" ;console.log(this.status)} ,
   ()=>{this.status="Updation Completed" ; console.log(this.status)}
  
  );
} 
   
this.editted=-1
   }

 /* ngOnInit() {
    console.log("oninit"+this.teamname)
    this.ds.getJobsByTeam(this.teamname).subscribe(a=> {this.jobs=a ; console.log(a)})
      
  }*/


teamNames:String[]=[]
noOfJobs:Number[]=[]
  ngOnChanges()
  {
   //console.log("onchanges"+this.teamname)
    this.ds.getJobsByTeam(this.teamname).subscribe(a=> {this.jobs=a ; console.log(this.jobs)})

    this.buildCharts() // to build all the charts
   
    
  }


buildCharts()
{
    
    console.log("in buildCharts")
    this.buildChartJS() // building chart using Chart.js
    this.buildHighChart() // build chart using HighCharts

}

highChart:any
series:Series[] =[]
buildHighChart()
{

    this.cs.getJobsPerTeamDistribution().subscribe((a)=>{
        console.log(a)
        //use below code to get key value pairs in any object
    this.series=[] // to ensure that each time the previous data is cleared
        
        for(var key in a) {
           let s:Series=new Series()
           s.name=key
           s.y=parseFloat(a[key])
           this.series.push(s)
         
       }

  console.log(this.series)
this.highChart=Highcharts.chart('high', {
  chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
  },
  title: {
      text: 'Jobs per team distribution'
  },
  tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  plotOptions: {
      pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} % ={point.y} jobs',
              style: {
                  //color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
              }
          }
      }
  },
  series: [{
      name: 'Jobs',
      //colorByPoint: true,
      data: JSON.parse(JSON.stringify(this.series))/*[{
          name: 'Chrome',
          y: 61.41,
          sliced: true,
          selected: true
      }, {
          name: 'Internet Explorer',
          y: 11.84
      }, {
          name: 'Firefox',
          y: 10.85
      }, {
          name: 'Edge',
          y: 4.67
      }, {
          name: 'Safari',
          y: 4.18
      }, {
          name: 'Sogou Explorer',
          y: 1.64
      }, {
          name: 'Opera',
          y: 1.6
      }, {
          name: 'QQ',
          y: 1.2
      }, {
          name: 'Other',
          y: 2.61
      }]*/
  }]
});

},err=>console.log(err))
}



buildChartJS()
{
  this.cs.getJobsPerTeamDistribution().subscribe((a)=>{
    console.log(a)
    //use below code to get key value pairs in any object
    this.teamNames=[] // all charts are built using new data obtained through ajax calls
    this.noOfJobs=[]

    for(var key in a) {
      
     this.teamNames.push(key)
     this.noOfJobs.push(a[key])
   }
  
   console.log(this.teamNames)
   console.log(this.noOfJobs)


   var chart = new Chart("ctx", {
    // The type of chart we want to create
    type: 'pie',

    // The data for our dataset
    data: {
        labels:this.teamNames,
        datasets: [{
            label: "Jobs Distribution across Teams",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: this.noOfJobs
        }]
    },

    // Configuration options go here
    options: {}
});


   
   })

}

  remove(j:MonitoringJob)
  {

    let t:boolean=window.confirm("Are you sure you wish to remove job with name "+j.jobName)
    if(t)
    {
      this.ds.deleteJob(j.jobName).subscribe((job)=>{console.log("Job"+JSON.stringify(job) +"has been deleted")},
      err=>{this.status="Deletion failed " ;console.log(this.status)},
    ()=>{this.status="Deletion completed" ;console.log(this.status) ; 
    this.jobs=this.jobs.filter(a=>a.jobName!=j.jobName) // this is done so that ui displays the new array with old job deleted  
    this.buildCharts() //rebuild the charts as the removal has changed the distribution of jobs
}
    
    
    );

    }


  }


  registerJob()
  {
this.jobToBeRegistered.teamName=this.teamname
//console.log(this.jobToBeRegistered)

this.ds.registerJob(this.jobToBeRegistered).subscribe(a=>{console.log("Job "+JSON.stringify(a)+ " is registered")},

err=>{ this.status="Registeration Failed";console.log(err)},

()=>{
  this.status="Registration completed"
  console.log(this.status); 
this.jobs.push(this.jobToBeRegistered); 
this.jobToBeRegistered= new MonitoringJob()
this.buildCharts() //rebuild the charts as the addition has changed the distribution of jobs
}


)


  }

}
