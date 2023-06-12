import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReportsService } from '../reports.service';
import { NotificationsService } from 'src/app/notifications.service';

@Component({
  selector: 'app-report-dialog',
  templateUrl: './report-dialog.component.html',
  styleUrls: ['./report-dialog.component.css']
})
export class ReportDialogComponent {
  planId!: string;
  comment: string = '';

  constructor(
    public dialogRef: MatDialogRef<ReportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data : { planId: string},
    private reportService: ReportsService,
    private ns: NotificationsService
  ){
    this.planId = data.planId;
  }

  submitReport(){
    this.reportService.reportPlan({planId: this.planId, comment: this.comment}).subscribe(() =>{
      this.ns.ShowNotification("Reported plan");
    })
  }
}
