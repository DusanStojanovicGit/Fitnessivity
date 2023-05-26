import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Plan } from './plans.entity';
import { Model } from 'mongoose';
import { SubmitPlanDto } from './dtos/submit-plan.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PlansService {
    constructor(@InjectModel('Plan')
        private readonly planModel : Model<Plan>,
        private readonly userService : UserService
    ){};

    async searchPrograms(criteria: any): Promise<Plan[]> {
        const query = this.planModel.find();
        if (criteria.type) {
            const types = criteria.type.split(','); 
            query.where('type').in(types);
        }
        if (criteria.genre) {
          query.where('genre').equals(criteria.genre);
        }
        if (criteria.sortBy) {
          query.sort(criteria.sortBy);
        }
        return query.exec();
      }

    async createPlan(dto: SubmitPlanDto, userId : string) : Promise<Plan>{
        const user = await this.userService.findById(userId);
        const plan = {
            ...dto,
            creator: user.username,
            days: dto.workouts.length,
        }
        return this.planModel.create(plan);
    }

    async getPlansByUser(username: string){
        console.log(username);
        const plans = await this.planModel.find({creator : `${username}`});
        return plans;
    }
}

