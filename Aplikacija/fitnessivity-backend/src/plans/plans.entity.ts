import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/user/user.entity';
import { SubmittedWorkout, Workout } from 'src/workouts/workouts.entity';

@Schema()
export class Plan extends Document {
  @Prop()
  name: string;

  @Prop()
  creator: string;

  @Prop()
  type: string;

  @Prop()
  genre: string;

  @Prop([{ type: Object }])
  workouts: Workout[];

  @Prop()
  workoutsCompleted: number;

  @Prop()
  days: number;

  @Prop()
  submissionDate: Date;

  @Prop()
  picture: string;

  @Prop()
  planLink: string;

  @Prop()
  description: string;
}

@Schema()
export class PersonalPlan extends Plan {
  @Prop()
  latestWorkout: Date;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ type: Types.ObjectId, ref: 'Plan', required: true })
  parentPlan: Plan;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'SubmittedWorkout' }] })
  submittedWorkouts: SubmittedWorkout[];
}

export const PersonalPlanSchema = SchemaFactory.createForClass(PersonalPlan);

export const PlanSchema = SchemaFactory.createForClass(Plan);

