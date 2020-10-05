import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UsersService {

    constructor(private readonly db: InMemoryDBService<UserEntity>) {

        const users: Array<Partial<UserEntity>> = [
            {
                type: 'sender',
                userName: 'sender1',
                password: 'sender1Password',
                id: "2ff85781-7adb-484f-a70b-86adacd22242"
            },
            {
                type: 'courier',
                userName: 'courier1',
                password: 'courier1Password',
                id: "58384f11-62e0-4397-8c94-16a43bde8fd8"
            }
        ];

        users.forEach(user => this.create(user));
    }

    async create(user: Partial<UserEntity>): Promise<UserEntity> {
        user.createdAt = new Date();
        return this.db.create(user);
    }

    async findByUserName(userName: string): Promise<UserEntity | undefined> {
        return this.db.query(u => u.userName == userName)[0];
    }
}
