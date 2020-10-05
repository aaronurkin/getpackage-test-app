import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserRequest } from 'src/requests/create-user.request';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly service: UsersService) {
    }

    @Post()
    register(@Body() model: CreateUserRequest) {
        return this.service.create({
            type: model.type,
            userName: model.userName,
            password: model.password
        });
    }
}
