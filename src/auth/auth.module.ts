import { Module } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';
import { UsersService } from 'src/users/users.service';

@Module({
  providers: [
    JwtStrategy,
    UsersService
  ],
  controllers: []
})
export class AuthModule {}
