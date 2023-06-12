import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReportedPlan } from './report.entity';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  rootUrl = 'http://10.241.185.86:3000/reports';
  constructor(private http: HttpClient) { }

  getReports(){
    return this.http.get<ReportedPlan[]>(this.rootUrl, {withCredentials: true});
  }
  
  reportPlan(report: { planId: string; comment: string }) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.rootUrl + '/report', report, { headers: headers }).pipe();
  }

  dismissReport(report: string){
    return this.http.delete(this.rootUrl + '/dismiss/' + report, {withCredentials: true});
  }

  approveReport(report: string){
    return this.http.delete(this.rootUrl + '/approve/' + report, {withCredentials: true});
  }
}
