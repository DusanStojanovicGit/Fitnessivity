import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PlansModule } from './plans/plans.module';
import { WorkoutModule } from './workouts/workout.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/fitnessivityV01'),
    UserModule,
    PlansModule,
    WorkoutModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
