import { Plan } from "../plan/plan.entity";
import { Workout } from "../workout/workout.entity";

export interface User {
    _id: string;
    email: string;
    password: string;
    username: string;
    isAdmin: boolean;
    name: string;
    bio: string;
    type: string;
    link: string;
    trainings: number;
    birthDate: Date;
    gender: string;
    personalPlans: Plan[];
    submittedWorkouts?: Workout[];
};

export interface UpdateUserDto {
    email?: string;
    password?: string;
    username?: string;
    name?: string;
    bio?: string;
    type?: string;
    gender?: string;
}