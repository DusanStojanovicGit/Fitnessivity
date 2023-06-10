import { Plan } from "../plan/plan.entity";

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