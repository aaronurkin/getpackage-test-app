import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {

    private users: Array<User>;

    constructor() {
        this.users = [
            {
                id: 1,
                type: 'sender',
                userName: 'sender1',
                password: 'sender1Password',
                createdAt: new Date()
            },
            {
                id: 2,
                type: 'courier',
                userName: 'courier1',
                password: 'courier1Password',
                createdAt: new Date()
            }
        ];
    }

    async findByUserName(userName: string): Promise<User | undefined> {
        return this.users.find(u => u.userName == userName);
    }
}
