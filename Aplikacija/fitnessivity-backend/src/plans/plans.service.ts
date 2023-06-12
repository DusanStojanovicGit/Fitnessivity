import { Injectable, MethodNotAllowedException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Plan } from './plans.entity';
import { Model } from 'mongoose';
import { SubmitPlanDto } from './dtos/submit-plan.dto';
import { UserService } from 'src/user/user.service';
import { Mode } from 'fs';
import { PersonalPlan } from './plans.entity';
import { WorkoutService } from 'src/workouts/workout.service';
import { stringify } from 'querystring';
import { UpdatePlanDto } from './dtos/update-plan.dto';

@Injectable()
export class PlansService {
    constructor(
        @InjectModel('Plan')
        private readonly planModel : Model<Plan>,

        private readonly userService : UserService,

        @InjectModel('PersonalPlan')
        private readonly personalPlanModel: Model<PersonalPlan>
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
        if (criteria.search) {
            const searchTerms = criteria.search.split(' ');
            const andConditions = searchTerms.map(term => {
              const termRegex = new RegExp(term, 'i');
              return { $or: [{ name: termRegex }, { creator: termRegex }] };
            });
            query.and(andConditions);
          }
        return query.exec();
      }

    async createPlan(dto: SubmitPlanDto, userId : string) : Promise<Plan>{
        const user = await this.userService.findById(userId);
        const plan = {
            ...dto,
            creator: user.username,
            days: dto.workouts.length,
            submissionDate: Date.now(),
            workoutsCompleted: 0,
        }
        return this.planModel.create(plan);
    }

    async recommendPlan(permissions: boolean, id: string){
        if (permissions){
            const plan = await this.planModel.findById(id);
            return this.planModel.findByIdAndUpdate(id, {isRecommended: !plan.isRecommended});
        }
        return new MethodNotAllowedException();
    }

    async getRecommendedPlans(){
        const plans = await this.planModel.find({isRecommended: true}).exec();
        console.log(plans);
        return plans;
    }
    
      

    async incrementWorkoutsCompleted(id: string){
        console.log(id);
        return this.planModel.findByIdAndUpdate(id, {$inc: {workoutsCompleted: 1}});
    }

    
    findById(id: string): Promise<Plan>{
        return this.planModel.findById(id);
    }

    async getPlansByUser(username: string){
        console.log(username);
        const plans = await this.planModel.find({creator : `${username}`});
        return plans;
    }

    async updatePlan(dto: UpdatePlanDto){
        const existingPlan = await this.planModel.findById(dto._id);
        if (existingPlan){
            for (const key in dto) {
                existingPlan[key] = dto[key];
              }
            await this.planModel.updateOne({ _id: dto._id }, { $set: existingPlan });
            return existingPlan;
        }
        else {
            return new NotFoundException("Plan not found");
        }
    }
    
    async deletePlan(planId: string, userId: string, isAdmin: boolean){
        const user = await this.userService.findById(userId);
        const plan = await this.findById(planId);
        if (user.username === plan.creator || isAdmin){
            const deletedPlan = await this.planModel.deleteOne({ _id: planId });
            return deletedPlan;
        }
        else {
            return new MethodNotAllowedException("No permissions");
        }

    }

    async deletePlanFromReport(planId: string){
        const deletedPlan = await this.planModel.deleteOne({ _id: planId });
        return deletedPlan;
    }

    async deletePersonalPlan(planId: string, userId: string, isAdmin: boolean){
        const plan = await this.personalPlanModel.findById(planId);
        console.log(plan);
        if (plan.user.toString() === userId || isAdmin) {
            await this.userService.removePersonalPlanFromUser(userId, planId);
            const deletedPlan = await this.personalPlanModel.deleteOne({_id: planId});
            return deletedPlan;
        }
        else{
            return new MethodNotAllowedException("No permissions");
        }
    }
}