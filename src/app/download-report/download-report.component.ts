import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-download-report',
  templateUrl: './download-report.component.html',
  styleUrls: ['./download-report.component.css']
})
export class DownloadReportComponent implements OnInit {

  constructor() { }



@Input()
teamname:String

  ngOnInit() {
  }

}
