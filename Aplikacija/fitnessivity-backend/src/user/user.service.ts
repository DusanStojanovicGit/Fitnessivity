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

  // async createLink(name: string, lastName : string){
  //   const link = (name + '_' + lastName).toLowerCase();
  //   const final10Users = await this.userModel.find({link : { $regex: `^${link}`}}).sort({link : -1}).limit(10);
  //   let maxIndex = 0;
  //   if (!(final10Users.length == 0)){
  //     final10Users.forEach((element) => {
  //       const [a, b, index] = element.link.split('_');
  //       const parsedIndex = parseInt(index);
  //       if (parsedIndex > maxIndex){
  //         maxIndex = parsedIndex;
  //       };
  //     }
  //   )};

  //   //const userCount = await this.userModel.countDocuments({link: '^${link}'});
  //   return link + '_' + (maxIndex + 1);
  // }

  async findUserProfile(username: string){
    const user = await this.userModel.findOne({username}).select('+bio +type +trainings');
    if (!user)
      throw new NotFoundException("User profile not found");
    return user;
  }

}