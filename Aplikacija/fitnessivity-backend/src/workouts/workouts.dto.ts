import { IsNotEmpty, IsString } from 'class-validator';

export class WorkoutDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString({ each: true })
    exerciseList: string[];
}