import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UsersService
    ) {}

    async createToken(user: UserEntity) {
        return {
            access_token: this.jwtService.sign({
                sub: user.id,
                userType: user.type,
                userName: user.userName
            }),
        }
    }

    async validateUser(userName: string, password: string) {

        const user = await this.userService.findByUserName(userName);

        //TODO: Add password encription and use password hash comparison instead
        if ( user !== undefined && user.password == password ) {
            return user;
        }

        return null;
    }
}
