import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ChartsService {

  constructor(private http:HttpClient) { }

  baseUrl:String="http://localhost:9091"

  getJobsPerTeamDistribution():Observable<Object>
  {
return this.http.get(`${this.baseUrl}/jobteamdistibution`)

  }

}
