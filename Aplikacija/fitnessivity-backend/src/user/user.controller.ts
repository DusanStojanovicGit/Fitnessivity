import { Body, Controller, Get, Post, Session, Param, Put } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { SigninUserDto } from './dtos/signin-user.dto';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

    @Get('/whoami')
    async whoAmI(@Session() session: any){
        const user = await this.userService.findById(session.userId)
        console.log(session);
        console.log(user);
        return user;
    }

    @Get(':id')
    async getUserById(@Param('id') userId: string){
        return this.userService.findUserProfile(userId);
    }

    @Get(':link')
    getUserProfile(@Param('link') link: string){
        return this.userService.findUserProfile(link);
    }

    @Put(':id')
    async updateUser(){
        
    }

    @Get()
    showUsers(){
        return this.userService.findAll();
    }

    @Post('/logout')
    async logout(@Session() session: any){
        session.userId = null;
    }

    @Post('/login')
    async signin(@Body() dto: SigninUserDto, @Session() session: any){
        const user = await this.authService.login(dto.email, dto.password);
        session.userId = user._id;
        return user;
    }

    @Post('/register')
    async createUser(@Body() dto: CreateUserDto, @Session() session: any){
        const user = await this.authService.register(dto);
        session.userId = user._id;
        return user;
    }

}
