import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportedPlanSchema } from './reports.entity';
import { PlansModule } from 'src/plans/plans.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ReportedPlan', schema: ReportedPlanSchema}
    ]),
    PlansModule,
  ],
  providers: [ReportsService],
  controllers: [ReportsController]
})
export class ReportsModule {}
