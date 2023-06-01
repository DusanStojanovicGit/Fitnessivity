import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class SigninUserDto { 
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(4)
  password: string;
}