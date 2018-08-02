import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // to enabling bootstrap query .js plugins

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import {AppRoutingModule} from './app-routing.module'
import { ComponentCommunicatorService} from './component-communicator.service';
import { FunctionalityComponent } from './functionality/functionality.component';
import { RegisterJobComponent } from './register-job/register-job.component';
import { DownloadReportComponent } from './download-report/download-report.component';
import { MonitorJobsComponent } from './monitor-jobs/monitor-jobs.component'
import {DataService} from './data.service'
import { HttpClientModule } from '@angular/common/http';
import {ChartsService} from './charts.service'
import {ChartModule} from 'angular-highcharts';
import { FilterReportByJobPipe } from './filter-report-by-job.pipe'
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FunctionalityComponent,
    RegisterJobComponent,
    DownloadReportComponent,
    MonitorJobsComponent,
    FilterReportByJobPipe
  ],
  imports: [
    ChartModule, //for highcharts
    BrowserModule,
   NgbModule.forRoot(), // for enabling bootstrap jquery.min,js etc
   FormsModule, // for enabling ngModel
   AppRoutingModule, // for enabling routing
   HttpClientModule // for enabling get,post,update,delete requests to rest endpoints
  ],
  providers: [ ComponentCommunicatorService, DataService,ChartsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
