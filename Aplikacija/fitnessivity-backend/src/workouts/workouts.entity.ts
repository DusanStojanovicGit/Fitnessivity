import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Plan } from 'src/plans/plans.entity';
import { User } from 'src/user/user.entity';
import { workerData } from 'worker_threads';

export interface Exercise {
    name : string,
    weight : number,
    length : number,
    reps : number,
    sets : number,
    rest : number 
}

@Schema()
export class Workout extends Document{
    @Prop()
    name : string;

    @Prop()
    day : number;

    @Prop([{ type: Object }])
    exercises: [Exercise];

    @Prop({ type: Types.ObjectId, ref: 'Plan', required: false })
    plan: Plan;                   
}

export const WorkoutSchema = SchemaFactory.createForClass(Workout);
