import { Body, Controller, Get, Post, Session, Param, Put, Query } from '@nestjs/common';
import { PlansService } from './plans.service';
import { SubmitPlanDto } from './dtos/submit-plan.dto';

@Controller('plans')
export class PlansController {

    constructor(private readonly planService: PlansService){};

    @Post('addPlan/:planId')
    async addPlan(@Session() session: any, @Param('planId') planId: string){
        const plan = await this.planService.createPersonalPlan(planId, session.userId);
        return plan;
    }

    @Post('/submitplan')
    async submitPlan(@Body() dto: SubmitPlanDto, @Session() session: any){
        const plan = await this.planService.createPlan(dto, session.userId);
        console.log(plan);
        return plan;
    }

    @Get('search')
    async searchPrograms(@Query() query: any): Promise<any> {
      const programs = await this.planService.searchPrograms(query);
      return programs;
    }

    @Get(':username')
    async getPlansByUser(@Param('username') username: string){
        const plans = await this.planService.getPlansByUser(username);
        return plans;
    }
}
