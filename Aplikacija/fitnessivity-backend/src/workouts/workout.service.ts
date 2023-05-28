import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Exercise, Workout } from './workouts.entity';
import { SubmittedWorkout } from './submitted-workout.entity';
import { WorkoutDto } from './workouts.dto';

@Injectable()
export class WorkoutService {
    constructor(
        @InjectModel('Workout')
        private readonly workoutModel: Model<Workout>,
        @InjectModel('SubmittedWorkout')
        private readonly submittedWorkoutModel: Model<SubmittedWorkout>
        ){};
    
    async createAndReturnIds(dtos : WorkoutDto[]): Promise<string[]>{
        const workoutIds = await Promise.all(
            dtos.map(async (workout: WorkoutDto) => {
            const createdWorkout = await this.workoutModel.create({
              name: workout.name,
              day: workout.day,
              exercises: workout.exercises.map((exercise: Exercise) => ({
                name: exercise.name,
                weight: exercise.weight,
                length: exercise.length,
                reps: exercise.reps,
                sets: exercise.sets,
                rest: exercise.rest,
              })),
            });
            return createdWorkout.id;
          })
        );
          return workoutIds;
    }
}
