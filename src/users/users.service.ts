import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UsersService {

    // private users: Array<User>;

    constructor(private readonly db: InMemoryDBService<UserEntity>) {
        /*
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
        */
    }

    async create(user: Partial<UserEntity>): Promise<UserEntity> {
        user.createdAt = new Date();
        return this.db.create(user);
    }

    async findByUserName(userName: string): Promise<UserEntity | undefined> {
        return this.db.query(u => u.userName == userName)[0];
    }
}
