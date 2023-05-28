import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Plan } from '../plans.entity';
import { User } from 'src/user/user.entity';
import { Types } from 'mongoose';
import { SubmittedWorkout } from 'src/workouts/submitted-workout.entity';

@Schema()
export class PersonalPlan extends Plan {
  @Prop()
  previousDay: number;

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