import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { Model } from 'mongoose';
import { User } from './user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userModel.create(createUserDto);
  }

  findById(_id: string){
    return this.userModel.findById({_id});
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  findOne(email: string) {
    return this.userModel.findOne({email});
  }

  async findUserProfile(_id: string){
    const user = await this.userModel.findById(_id).select('-email');
    if (!user)
      throw new NotFoundException("User profile not found");
    return user;
  }

}