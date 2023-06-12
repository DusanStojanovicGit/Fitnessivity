import { Body, Controller, Get, Post, Session, Param, Put, Query, Delete } from '@nestjs/common';
import { PlansService } from './plans.service';
import { SubmitPlanDto } from './dtos/submit-plan.dto';
import { UpdatePlanDto } from './dtos/update-plan.dto';
import { PersonalPlanService } from './personal-plan/personal-plan.service';

@Controller('plans')
export class PlansController {

    constructor(private readonly planService: PlansService,
        private readonly personalPlanService: PersonalPlanService){};

    @Post('addPlan/:planId')
    async addPlan(@Session() session: any, @Param('planId') planId: string){
        const plan = await this.personalPlanService.createPersonalPlan(planId, session.userId);
        return plan;
    }

    @Post('/submitplan')
    async submitPlan(@Body() dto: SubmitPlanDto, @Session() session: any){
        const plan = await this.planService.createPlan(dto, session.userId);
        console.log(plan);
        return plan;
    }

    @Put('recommendplan/:id')
    async recommendPlan(@Session() session: any, @Param('id') id: string){
        return this.planService.recommendPlan(session.permissions, id);
    }

    @Put('/updateplan')
    async updatePlan(@Body() dto: UpdatePlanDto){
        return this.planService.updatePlan(dto);
    }

    @Delete(':id')
    async deletePlan(@Param('id') id: string){
        this.planService.deletePlan(id);
    }

    @Delete('personalplan/:id')
    async deletePersonalPlan(@Param('id') id: string){
        this.planService.deletePersonalPlan(id);
    }

    @Get('search')
    async searchPrograms(@Query() query: any): Promise<any> {
      const programs = await this.planService.searchPrograms(query);
      return programs;
    }

    @Get('recommended')
    async getRecommendedPlans(){
        return this.planService.getRecommendedPlans();
    }

    @Get(':username')
    async getPlansByUser(@Param('username') username: string){
        const plans = await this.planService.getPlansByUser(username);
        return plans;
    }


    @Get('get/:id')
    async getPlan(@Param('id') id: string){
        const plan = await this.planService.findById(id);
        return plan;
    }
}
