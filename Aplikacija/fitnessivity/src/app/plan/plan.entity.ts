import { User } from "../user/user.entity";

export interface Plan {
    _id: string;
    name: string;
    creator: string;
    type: string;
    genre: string;
    workoutsCompleted: number;
    days: number;
    submissionDate: Date;
    description: string;
    parentPlan?: Plan;
    user?: User;
}