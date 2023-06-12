import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Workout } from './workouts.entity';
import { PlansService } from 'src/plans/plans.service';

@Injectable()
export class WorkoutService {
    constructor(
        @InjectModel('Workout')
        private readonly workoutModel: Model<Workout>,

        @Inject(forwardRef(() => PlansService))
        private readonly planService : PlansService,
        ){};
    
    // async createAndReturnIds(dtos : WorkoutDto[]): Promise<string[]>{
    //     const workoutIds = await Promise.all(
    //         dtos.map(async (workout: WorkoutDto) => {
    //         const createdWorkout = await this.workoutModel.create({
    //           name: workout.name,
    //           day: workout.day,
    //           exercises: workout.exercises.map((exercise: Exercise) => ({
    //             name: exercise.name,
    //             weight: exercise.weight,
    //             length: exercise.length,
    //             reps: exercise.reps,
    //             sets: exercise.sets,
    //             rest: exercise.rest,
    //           })),
    //         });
    //         return createdWorkout.id;
    //       })
    //     );
    //       return workoutIds;
    // }

    // async retrieveLastWorkout(personalPlanId: string): Promise<SubmittedWorkout>{
    //     const plan : PersonalPlan = await this.planService.findById(personalPlanId, true);
    //     plan.workouts
    // }
  }

