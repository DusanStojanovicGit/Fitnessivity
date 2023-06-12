import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { PersonalPlan } from 'src/plans/plans.entity';
import { Plan } from 'src/plans/plans.entity';
import { User } from 'src/user/user.entity';

export interface Exercise {
    name : string,
    weight : number,
    length : number,
    reps : number,
    sets : number,
    rest : number 
}

export class Workout {
  name : string;
  day : number;
  exercises: [Exercise];               
}

@Schema()
export class SubmittedWorkout extends Document {
  @Prop()
  name : string;

  @Prop()
  day : number;

  @Prop([{ type: Object }])
  exercises: [Exercise];

  @Prop({ type: Types.ObjectId, ref: 'Plan', required: false })
  plan: Plan; 

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ type: Types.ObjectId, ref: 'PersonalPlan', required: false })
  personalPlan: PersonalPlan;

  @Prop()
  date: Date;
}

export const SubmittedWorkoutSchema = SchemaFactory.createForClass(SubmittedWorkout);
export const WorkoutSchema = SchemaFactory.createForClass(Workout);
