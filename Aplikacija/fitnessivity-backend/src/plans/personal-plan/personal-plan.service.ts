import { Inject, Injectable } from '@nestjs/common';
import { PersonalPlan } from '../plans.entity';
import { Model } from 'mongoose';
import { PlansService } from '../plans.service';
import { InjectModel } from '@nestjs/mongoose';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PersonalPlanService {
    constructor(
        private readonly planService: PlansService,

        @InjectModel('PersonalPlan')
        private readonly personalPlanModel: Model<PersonalPlan>,

        private readonly userService: UserService
        ){}

    async createPersonalPlan(parentPlanId: string, userId: string): Promise<PersonalPlan>{
        const parentPlan = await this.planService.findById(parentPlanId);
        const personalPlan = {
            name: parentPlan.name,
            creator: parentPlan.creator,
            type: parentPlan.type,
            genre: parentPlan.genre,
            workouts: parentPlan.workouts,
            days: parentPlan.days,
            picture: parentPlan.picture,
            planLink: parentPlan.planLink,
            user: userId,
            latestWorkout: Date.now(),
            parentPlan: parentPlanId
        }
        console.log(personalPlan);
        const createdPlan = await this.personalPlanModel.create(personalPlan);
        this.userService.addPersonalPlan(createdPlan, userId);
        return createdPlan;
    }

    async findById(id: string, populateParentPlan: boolean = false): Promise<PersonalPlan>{
        if (populateParentPlan) {
            return await this.personalPlanModel.findById(id).populate('parentPlan').exec();
          }
          return await this.personalPlanModel.findById(id).exec();
        }
    }

