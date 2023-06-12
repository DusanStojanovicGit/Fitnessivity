import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { PlansService } from 'src/plans/plans.service';
import { ReportedPlan } from './reports.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ReportsService {
    constructor(
        @InjectModel('ReportedPlan')private readonly reportsModel : Model<ReportedPlan>,
        private readonly planService: PlansService){}

    async reportPlan(planId: string, comment: string){
        const reportedPlan = await this.planService.findById(planId);
        const report = {
            plan: reportedPlan,
            comment: comment
        }
        console.log(report);
        console.log(reportedPlan);
        if (reportedPlan){
            return this.reportsModel.create(report);
        }
        return new NotFoundException("Plan not found");
    }

    async getReports(){
        return this.reportsModel.find().populate('plan');
    }

    async dismissReport(reportId: string){
        return this.reportsModel.findByIdAndRemove(reportId);
    }

    async approveReport(reportId: string){
        const report = await this.reportsModel.findById(reportId).populate('plan');
        const planId = report.plan._id;
        this.dismissReport(reportId);
        return this.planService.deletePlanFromReport(planId);
    }


}
