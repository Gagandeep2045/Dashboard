import { Pipe, PipeTransform } from '@angular/core';
import { JobReport } from './model-classes/jobReport';

@Pipe({
  name: 'filterReportByJob'
})
export class FilterReportByJobPipe implements PipeTransform {

  transform(value: JobReport[], args?: any): any {
    
    console.log(value)
    console.log(args)
   if(value!=null && value!=undefined && args!="All Jobnames")
   return value.filter(a=>a.jobName==args)

   return value;

  }

}
