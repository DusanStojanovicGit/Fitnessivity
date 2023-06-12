import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, ValidateNested } from "class-validator";
import { WorkoutDto } from "src/workouts/dtos/workouts.dto";

export class SubmitPlanDto{
    @IsNotEmpty()
    name: string;

    @IsOptional()
    creator: string;

    @IsNotEmpty()
    type: string;

    @IsNotEmpty()
    genre: string;

    @ValidateNested({ each: true })
    @Type(() => WorkoutDto)
    workouts: WorkoutDto[];

    @IsOptional()
    picture: string;

    @IsOptional()
    workoutsCompleted = 0;

    @IsOptional()
    submissionDate: Date;

    @IsOptional()
    description: string;

    @IsOptional()
    days: number;
}