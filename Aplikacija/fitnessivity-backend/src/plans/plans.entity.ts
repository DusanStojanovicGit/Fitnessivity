import * as mongoose from 'mongoose';
import { Workout } from 'src/workouts/workouts.interface';
import { User } from 'src/user/user.entity';

export interface Plan extends mongoose.Document{
    name: string,
    creator: string,
    type: string,
    genre: string,
    workouts: {name: string, exerciseList: string[]}[],
    workoutsCompleted: number,
    days: number,
    submissionDate: Date,
    picture: string,
    planLink: string,
    description: string,
};

export const PlanSchema = new mongoose.Schema({
    name: String,
    creator: String,
    type: String,
    genre: String,
    workouts: [{name: String, exerciseList: [String]}],
    workoutsCompleted: Number,
    days: Number,
    submissionDate: {type: Date, default: () => Date.now()},
    picture: String,
    planLink: String,
    description: {type: String, select: false},
});

