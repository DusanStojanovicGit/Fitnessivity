import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubmittedWorkout, Workout } from '../workouts.entity';
import { PlansService } from 'src/plans/plans.service';
import { WorkoutDto } from '../dtos/workouts.dto';
import { PersonalPlanService } from 'src/plans/personal-plan/personal-plan.service';

@Injectable()
export class SubmittedWorkoutService {
    constructor(
        @InjectModel('SubmittedWorkout')
        private readonly submittedWorkoutModel: Model<SubmittedWorkout>,
        @Inject(forwardRef(() => PlansService))
        private readonly planService : PlansService,
        @Inject(forwardRef(() => PersonalPlanService))
        private readonly personalPlanService : PersonalPlanService
    ){}

    // async updateLatestWorkoutDate(id: string): Promise<any> {
    //     const submittedWorkout = await this.submittedWorkoutModel.findById(id);
    //     if (submittedWorkout) {
    //       const plan = await this.planService.findById(submittedWorkout.personalPlan._id);
    //       if (plan) {
    //         await plan.updateOne({ _id: plan._id }, { $set: { latestWorkout: Date.now() } });
    //       }
    //     }
    // }
    async retrievePreviousWorkout(planId: string){
        const plan = await this.personalPlanService.findById(planId);
        const workouts = await this.submittedWorkoutModel.find({ personalPlan: planId }).sort({ date: -1 }).limit(plan.days);
        if (workouts.length < plan.days)
            return plan.workouts[workouts.length];
        return workouts[workouts.length-1];
    }

    async submitWorkout(dto: WorkoutDto, userId: string, planId: string): Promise<SubmittedWorkout>{
        const workout = {
            ...dto,
            user: userId,
            personalPlan: planId,
            date: Date.now()
        }
        const personalPlan = await this.personalPlanService.findById(planId);
        this.planService.incrementWorkoutsCompleted(personalPlan.parentPlan._id);
        return this.submittedWorkoutModel.create(workout);
    }
}
