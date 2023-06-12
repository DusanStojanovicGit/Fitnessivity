import { Component } from '@angular/core';
import { ReportedPlan } from './report.entity';
import { ReportsService } from './reports.service';
import { NotificationsService } from '../notifications.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {

  reports: ReportedPlan[] = [];
  constructor(private reportsService: ReportsService,
    private noficationsService: NotificationsService){}

  ngOnInit(){
    this.reportsService.getReports().subscribe(p => {
      this.reports = p;
    });
  }

  approveReport(r: ReportedPlan, index: number){
    this.reportsService.approveReport(String(r._id)).subscribe(() => this.noficationsService.ShowNotification("Approved report"));
    this.reports.splice(index, 1);
  }

  dismissReport(r: ReportedPlan, index: number){
    this.reportsService.dismissReport(String(r._id)).subscribe(() => this.noficationsService.ShowNotification("Dissmised report"));
    this.reports.splice(index, 1);
  }

}
