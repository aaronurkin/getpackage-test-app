import { Controller, Post } from '@nestjs/common';
import { UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';

@Controller('authenticate')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post()
    authenticate(@Request() request) {
        return this.authService.createToken(request.user);
    }
}
