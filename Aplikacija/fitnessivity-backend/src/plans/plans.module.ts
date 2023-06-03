import { Module, forwardRef } from '@nestjs/common';
import { PlansService } from './plans.service';
import { PlansController } from './plans.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PlanSchema, PersonalPlanSchema } from './plans.entity';
import { UserModule } from 'src/user/user.module';
import { WorkoutModule } from 'src/workouts/workout.module';
import { PersonalPlanService } from './personal-plan/personal-plan.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Plan', schema: PlanSchema },
      { name: 'PersonalPlan', schema: PersonalPlanSchema }
    ]),
    UserModule,
    forwardRef(() => WorkoutModule),
  ],
  providers: [PlansService, PersonalPlanService],
  controllers: [PlansController],
  exports: [PlansService, PersonalPlanService]
})
export class PlansModule {}
