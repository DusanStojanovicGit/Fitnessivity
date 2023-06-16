import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PlansModule } from './plans/plans.module';
import { WorkoutModule } from './workouts/workout.module';
import { ImagesModule } from './images/images.module';
import { MulterModule } from '@nestjs/platform-express';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/fitnessivityV03'),
    UserModule,
    MulterModule.register({
      dest: './src/images/upload'
    }),
    PlansModule,
    WorkoutModule,
    ImagesModule,
    ReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
