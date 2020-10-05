import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    InMemoryDBModule.forRoot({})
  ],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
