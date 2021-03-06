import { Module } from '@nestjs/common';
import { DeliveriesController } from './deliveries/deliveries.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { DeliveriesService } from './deliveries/deliveries.service';
import { DeliveriesModule } from './deliveries/deliveries.module';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { RevenueModule } from './revenue/revenue.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    DeliveriesModule,
    InMemoryDBModule.forRoot({}),
    ConfigModule.forRoot({isGlobal: true}),
    RevenueModule
  ],
  controllers: [
    DeliveriesController
  ],
  providers: [
    DeliveriesService
  ],
})
export class AppModule {}
