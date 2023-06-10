import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Plan } from 'src/plans/plans.entity';

@Schema()
export class ReportedPlan extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Plan'})
  plan: Plan;
 
  @Prop()
  comment: string;
}

export const ReportedPlanSchema = SchemaFactory.createForClass(ReportedPlan);

