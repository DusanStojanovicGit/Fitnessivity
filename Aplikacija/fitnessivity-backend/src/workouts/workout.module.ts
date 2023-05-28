import { Module } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { WorkoutsController } from './workouts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SubmittedWorkoutSchema } from './submitted-workout.entity';
import { WorkoutSchema } from './workouts.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: 'SubmittedWorkout', schema: SubmittedWorkoutSchema},
            {name: 'Workout', schema: WorkoutSchema},
    ])
    ],
    providers: [WorkoutService],
    controllers: [WorkoutsController],
    exports: [WorkoutService]
})
export class WorkoutModule {}
