import { Module } from '@nestjs/common';
import { PlansService } from './plans.service';
import { PlansController } from './plans.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PlanSchema } from './plans.entity';
import { PersonalPlanSchema } from './personal-plans/personal-plan.entity';
import { UserModule } from 'src/user/user.module';
import { WorkoutModule } from 'src/workouts/workout.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Plan', schema: PlanSchema },
      { name: 'PersonalPlan', schema: PersonalPlanSchema }
    ]),
    UserModule,
    WorkoutModule
  ],
  providers: [PlansService],
  controllers: [PlansController]
})
export class PlansModule {}
