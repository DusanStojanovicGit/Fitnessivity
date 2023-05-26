import * as mongoose from 'mongoose';
import { Plan } from 'src/plans/plans.entity';
import { User } from 'src/user/user.entity';

export interface Exercise {
    name : string,
    workout : Workout,
    weight : Number,
    length : Number,
    reps : Number,
    sets : Number,
    rest : Number 
}

export interface Workout extends mongoose.Document{
    name : string,
    plan : Plan,
    user : User,
    exercises: Exercise[]                    
}
