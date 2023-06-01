import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Exercise } from '../workouts.entity';

export class WorkoutDto {
    id: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    exercises: [Exercise];

    @IsOptional()
    day: number;
}