import { Body, Controller, Delete, Get, MethodNotAllowedException, Param, Post, Session } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { reportDTO } from './report.dto';

@Controller('reports')
export class ReportsController {
    constructor(private readonly reportsService: ReportsService){}

    @Post('report')
    async reportPlan(@Body() report : reportDTO){
        console.log(report.planId, report.comment);
        return this.reportsService.reportPlan(report.planId, report.comment);
    }

    @Get()
    async getPlans(@Session() session: any){
        if (session.permissions)
            return this.reportsService.getReports();
        return new MethodNotAllowedException("Not an admin");
    }

    @Delete('dismiss/:id')
    async dismissReport(@Session() session: any, @Param('id') id: string ){
        if (session.permissions)
            return this.reportsService.dismissReport(id);
        return new MethodNotAllowedException("Not an admin");
    }

    @Delete('approve/:id')
    async approveReport(@Session() session: any, @Param('id') id: string ){
        if (session.permissions)
            return this.reportsService.approveReport(id);
        return new MethodNotAllowedException("Not an admin");
    }

}
