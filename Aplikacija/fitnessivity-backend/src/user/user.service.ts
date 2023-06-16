import { Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { Model } from 'mongoose';
import { User } from './user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { SubmittedWorkout } from 'src/workouts/workouts.entity';
import { PersonalPlan } from 'src/plans/plans.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    let admin: boolean = false; 
    if ((await this.findExisiting()).length == 0)
      admin = true;
    return this.userModel.create({...createUserDto, trainings: 0, isAdmin: admin});
  }

  async updateUser(dto: UpdateUserDto, id: string): Promise<User>{
    const update = {};
    if (dto.password || dto.email || dto.username){
      dto = await this.authService.validateUser(dto);
    }
    for (const key in dto) {
      update[key] = dto[key];
    }
  
    await this.userModel.updateOne({ _id: id }, { $set: update });
  
    const updatedUser = await this.findById(id);
    return updatedUser;
  }

  async addWorkout(userId: string, workout: SubmittedWorkout) {
    const user = await this.userModel.findById(userId);
    user.submittedWorkouts.push(workout);
    await user.save();
  }

  async findById(_id: string){
    const user = await this.userModel.findById(_id).populate('personalPlans');
    if (!user){
      throw new NotFoundException("User not found")
    }
    return user;
  }

  async incrementTrainings(userId: string){
      return this.userModel.findByIdAndUpdate(userId, {$inc: {trainings: 1}});
  }

  async findExisiting(): Promise<User[]> {
    return this.userModel.find().limit(1).exec();
  }

  findOne(email: string) {
    return this.userModel.findOne({email});
  }

  async removePersonalPlanFromUser(userId: string, planId: string) {
    await this.userModel.updateOne(
      { _id: userId },
      { $pull: { personalPlans: planId } }
    );
  }

  findOneByUsername(username: string){
    return this.userModel.findOne({username});
  }

  async addPersonalPlan(personalPlan : PersonalPlan, userId: string){
    const user = await this.userModel.findById(userId);
    user.personalPlans.push(personalPlan);
    await user.save();
  }

  async findUserProfile(username: string) {
    const usernameRegex = new RegExp(`^${username}$`, 'i');
    const user = await this.userModel
      .findOne({username: usernameRegex})
      .select('+email +bio +type +trainings')
      .populate({
        path: 'submittedWorkouts',
        options: { sort: { 'date': -1 } }
      })
      .populate({
        path: 'personalPlans',
        options: { sort: { 'latestWorkout': -1 } }
      })
    if (!user)
      throw new NotFoundException("User profile not found");
    return user;
  }
  

}