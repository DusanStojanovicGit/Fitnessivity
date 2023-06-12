import { Workout } from "../workout/workout.entity";
import { User } from "../user/user.entity";

export interface Plan {
    _id?: string;
    name: string;
    creator?: string;
    type: string;
    genre: string;
    isRecommended?: boolean;
    workoutsCompleted?: number;
    days?: number;
    submissionDate?: Date;
    description: string;
    workouts: Workout[];
    parentPlan?: Plan;
    user?: User;
}
