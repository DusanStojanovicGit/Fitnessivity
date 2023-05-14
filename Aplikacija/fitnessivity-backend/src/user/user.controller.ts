import { Body, Controller, Get, Post, Session } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { SigninUserDto } from './dtos/signin-user.dto';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

    @Get()
    showUsers(){
        return this.userService.findAll();
    }

    @Post('/login')
    async signin(@Body() dto: SigninUserDto, @Session() session: any){
        const user = await this.authService.login(dto.email, dto.password);
        return user;
    }

    @Post('/register')
    async createUser(@Body() dto: CreateUserDto){
        const user = await this.authService.register(dto);
        return user;
    }

}
