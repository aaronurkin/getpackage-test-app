import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { UsersService } from "../users/users.service";
import { User } from "../users/user.entity";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        private readonly userService: UsersService,
        private readonly configService: ConfigService
    ) {
        super({
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload: any): Promise<User> {

        const user = await this.userService.findByUserName(payload.userName);

        if ( !user ) {
            throw new UnauthorizedException();
        }

        return user;
    }
}