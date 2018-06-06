import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject'
import { Observable } from 'rxjs/Observable';
@Injectable()
export class ComponentCommunicatorService {

bs:BehaviorSubject<String> = new BehaviorSubject<String>(null)
os:Observable<String> = this.bs.asObservable();
  constructor() { }


   loginStatus(username:String)
   {if(username!=null)
     this.bs.next(username)
   
    else
    this.bs.next(username)
   }


}
