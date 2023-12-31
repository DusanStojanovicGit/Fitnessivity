import { Module, forwardRef } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { WorkoutsController } from './workouts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkoutSchema, SubmittedWorkoutSchema } from './workouts.entity';
import { PlansModule } from 'src/plans/plans.module';
import { SubmittedWorkoutService } from './submitted-workout/submitted-workout.service';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: 'SubmittedWorkout', schema: SubmittedWorkoutSchema},
            {name: 'Workout', schema: WorkoutSchema}
    ]),
    forwardRef(() => PlansModule),
    forwardRef(() => UserModule)
    ],
    providers: [WorkoutService, SubmittedWorkoutService],
    controllers: [WorkoutsController],
    exports: [WorkoutService, SubmittedWorkoutService]
})
export class WorkoutModule {}
