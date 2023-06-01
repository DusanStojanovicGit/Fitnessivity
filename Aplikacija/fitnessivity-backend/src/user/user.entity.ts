import { Prop, Schema,SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { PersonalPlan } from 'src/plans/plans.entity';
import { SubmittedWorkout } from 'src/workouts/workouts.entity';

@Schema()
export class User extends Document {
  @Prop({ select: false })
  email: string;

  @Prop({ select: false })
  password: string;

  @Prop()
  username: string;

  @Prop()
  isAdmin: boolean;

  @Prop()
  name: string;

  @Prop({ select: false })
  bio: string;

  @Prop({ select: false })
  type: string;

  @Prop({ select: false })
  pictureLink: string;

  @Prop()
  trainings: Number;

  @Prop({ select: false })
  birthDate: Date;

  @Prop()
  gender: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'SubmittedWorkout' }] })
  submittedWorkouts: SubmittedWorkout[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'PersonalPlan' }]})
  personalPlan: PersonalPlan[];
}

export const UserSchema = SchemaFactory.createForClass(User);