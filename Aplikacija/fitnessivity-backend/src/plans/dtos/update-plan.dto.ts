import { Workout } from "src/workouts/workouts.entity";

export class UpdatePlanDto {
    name?: string;
    creator?: string;
    type?: string;
    genre?: string;
    workouts?: Workout[];
    days?: number;
    picture?: string;
    planLink?: string;
    description?: string;
  }