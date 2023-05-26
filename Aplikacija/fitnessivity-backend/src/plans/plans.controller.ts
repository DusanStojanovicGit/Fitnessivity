import { Body, Controller, Get, Post, Session, Param, Put } from '@nestjs/common';
import { PlansService } from './plans.service';
import { SubmitPlanDto } from './dtos/submit-plan.dto';

@Controller('plans')
export class PlansController {

    constructor(private readonly planService: PlansService){};

    @Post('/submitplan')
    async submitPlan(@Body() dto: SubmitPlanDto, @Session() session: any){
        const plan = await this.planService.createPlan(dto, session.userId);
        console.log(plan);
        return plan;
    }

    @Get(':username')
    async getPlansByUser(@Param('username') username: string){
        const plans = await this.planService.getPlansByUser(username);
        return plans;
    }
}
