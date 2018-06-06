import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import { text } from '@angular/core/src/render3/instructions';
import {MonitoringJob} from'./model-classes/monitoring-job'
import { HttpHeaders } from '@angular/common/http'
import { JobReport } from './model-classes/jobReport';
import { User } from './model-classes/user';
@Injectable()
export class DataService {

  constructor(private http:HttpClient) { }

  baseUrl:String="http://localhost:9091"
httpHeader:HttpHeaders= new HttpHeaders({'Content-Type':'application/json'})

authenticateUser(user:User):Observable<String>
{
  return this.http.post(`${this.baseUrl}/authenticate`,user,{responseType:"text"})
}

  getTeamName(username:String): Observable<String>
  {
     return this.http.get(`${this.baseUrl}/team/${username}`,{responseType:'text'}).pipe();

  }


  
  getJobsByTeam(teamname:String):Observable<MonitoringJob[]>
  {//console.log(teamname)

return this.http.get<MonitoringJob[]>(`${this.baseUrl}/getJob/${teamname}`)
  }

  updateSla(j:MonitoringJob):Observable<MonitoringJob>
  {

    return this.http.put<MonitoringJob>(`${this.baseUrl}/updateSLA`,j,{headers:this.httpHeader})
  }



  deleteJob(jobname:String):Observable<MonitoringJob>
  {
    return this.http.delete<MonitoringJob>(`${this.baseUrl}/removeJob/${jobname}`)
  }


  registerJob(job:MonitoringJob):Observable<MonitoringJob>
  {

    return this.http.post<MonitoringJob>(`${this.baseUrl}/registerJob`,job,{headers:this.httpHeader})
  }


  jobExists(jobname:String):Observable<String>
  {
    return this.http.get(`${this.baseUrl}/jobexists/${jobname}`,{responseType:"text"})
  }

  getAllTeams():Observable<String[]>
  {
   return  this.http.get<String[]>(`${this.baseUrl}/getAllTeams`)
  }


  getJobsByTeamAndStatus(team:String, status:String):Observable<JobReport[]>
  {
return this.http.get<JobReport[]>(`${this.baseUrl}//getJobsByTeamAndStatus/${team}/${status}`)
  }

}
