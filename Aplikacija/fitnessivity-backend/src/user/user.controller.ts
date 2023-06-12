import { Body, Controller, Get, Post, Session, Param, Put, Res } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { SigninUserDto } from './dtos/signin-user.dto';
import { Response } from 'express';
import { cookieOptions } from 'src/cookieOptions';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

    @Get('/whoami')
    async whoAmI(@Session() session: any){
        const user = await this.userService.findById(session.userId);
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

    @Put('update')
    async updateUser(@Session() session: any, @Body() dto: UpdateUserDto){
        return this.userService.updateUser(dto, session.userId);
    }

    @Post('/logout')
    async logout(@Session() session: any, @Res() res: Response){
        session.userId = null;
        session.permissions = null;
        res.clearCookie('session', cookieOptions);
        res.status(200).json({ message: 'Logged out successfully' });
    }

    @Post('/login')
    async signin(@Body() dto: SigninUserDto, @Session() session: any){
        const user = await this.authService.login(dto.email, dto.password);
        session.userId = user._id;
        session.permissions = user.isAdmin;
        user.password = null;
        return user;
    }

    @Post('/register')
    async createUser(@Body() dto: CreateUserDto, @Session() session: any){
        const user = await this.authService.register(dto);
        session.userId = user._id;
        session.permissions = user.isAdmin;
        return user;
    }

}
