import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Exercise, Workout } from 'src/workouts/workouts.entity';

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

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Workout' }] })
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

export const PlanSchema = SchemaFactory.createForClass(Plan);

