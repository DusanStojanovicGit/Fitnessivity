import { Body, Controller, Get, Param, Post, Session } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { WorkoutDto } from './dtos/workouts.dto';
import { SubmittedWorkoutService } from './submitted-workout/submitted-workout.service';

@Controller('workouts')
export class WorkoutsController {
    constructor(private readonly workoutService: WorkoutService,
        private readonly submittedWorkoutService: SubmittedWorkoutService){};

    @Post('submit/:planId')
    async submitWorkout(@Session() session: any, @Body() dto: WorkoutDto, @Param('planId') planId: string){
        const workout = await this.submittedWorkoutService.submitWorkout(dto, session.userId, planId);
        return workout;
    }
    @Get('getlastworkout/:planId')
    async retrieveLastWorkout(@Param('planId') id : string){
        const lastWorkout = await this.submittedWorkoutService.retrievePreviousWorkout(id);
        return lastWorkout;
    }
}