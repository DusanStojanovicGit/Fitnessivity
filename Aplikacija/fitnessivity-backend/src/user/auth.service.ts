import { BadRequestException, NotFoundException, Injectable } from "@nestjs/common";
import { UserService } from "./user.service";
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from "util";
import { CreateUserDto } from "./dtos/create-user.dto";

const scrypt = promisify(_scrypt);

// Ime, prezime, datum rođenja, pol. 
@Injectable()
export class AuthService {
    constructor(private userService: UserService){}

    async register(dto: CreateUserDto) {
        if (await this.userService.findOne(dto.email)){
            throw new BadRequestException('email in use');
        }
        if (await this.userService.findOneByUsername(dto.username)){
            throw new BadRequestException('Username taken');
        }
        const hashedPassword = await this.hashNewPassword(dto.password);
        const user = await this.userService.create({
            ...dto,
            password: hashedPassword,
        });

        return user;
    }

    async login(email: string, password: string) {
        const user = await this.userService.findOne(email).select('+password');
        if (!user){
            throw new NotFoundException("user not found");
        }
        console.log(user);
        const [salt] = user.password.split('.', 1);
        const passwordHash = await this.hashPassword(password, salt);
        if (passwordHash !== user.password)
            throw new BadRequestException('Incorrect password');
        return user;
    }

    private async hashPassword(password: string, salt: string){
        const hash = (await scrypt(password, salt, 24)) as Buffer;
        password = salt + '.' + hash.toString('hex');
        return password; 
    }

    private async hashNewPassword(password: string){
        const salt = randomBytes(8).toString('hex');
        return this.hashPassword(password, salt);
    }
}