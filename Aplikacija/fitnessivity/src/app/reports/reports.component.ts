import { Component } from '@angular/core';
import { ReportedPlan } from './report.entity';
import { ReportsService } from './reports.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {

  reports: ReportedPlan[] = [];
  constructor(private reportsService: ReportsService){}

  ngOnInit(){
    this.reportsService.getReports().subscribe(p => {
      this.reports = p;
    });
  }

  
}
