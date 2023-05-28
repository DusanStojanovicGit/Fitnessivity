import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Types, Document } from "mongoose";
import { PersonalPlan } from "src/plans/personal-plans/personal-plan.entity";
import { User } from "src/user/user.entity";
import { Workout } from "./workouts.entity";

export interface Exercise {
    name : string,
    weight : number,
    length : number,
    reps : number,
    sets : number,
    rest : number 
}
@Schema()
export class SubmittedWorkout extends Workout{  
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user: User;

    @Prop({ type: Types.ObjectId, ref: 'PersonalPlan', required: false })
    personalPlan: PersonalPlan;
}

export const SubmittedWorkoutSchema = SchemaFactory.createForClass(SubmittedWorkout);