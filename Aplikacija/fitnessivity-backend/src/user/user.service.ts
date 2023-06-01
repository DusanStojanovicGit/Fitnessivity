import { Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { Model } from 'mongoose';
import { User } from './user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { AuthService } from './auth.service';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userModel.create(createUserDto);
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

  async findById(_id: string){
    const user = await this.userModel.findById(_id);
    if (!user){
      throw new NotFoundException("User not found")
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  findOne(email: string) {
    return this.userModel.findOne({email});
  }

  findOneByUsername(username: string){
    return this.userModel.findOne({username});
  }

  async findUserProfile(username: string) {
    const usernameRegex = new RegExp(`^${username}$`, 'i');
    const user = await this.userModel.findOne({username: usernameRegex}).select('+bio +type +trainings');
    if (!user)
      throw new NotFoundException("User profile not found");
    return user;
  }
  

}