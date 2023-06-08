import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PlansModule } from './plans/plans.module';
import { WorkoutModule } from './workouts/workout.module';
import { ImagesModule } from './images/images.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/fitnessivityV01'),
    UserModule,
    MulterModule.register({
      dest: './src/images/upload'
    }),
    PlansModule,
    WorkoutModule,
    ImagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
