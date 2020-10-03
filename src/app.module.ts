import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DeliveriesController } from './deliveries/deliveries.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { DeliveriesService } from './deliveries/deliveries.service';
import { DeliveriesModule } from './deliveries/deliveries.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({isGlobal: true}),
    DeliveriesModule
  ],
  controllers: [
    AppController,
    DeliveriesController
  ],
  providers: [
    AppService,
    DeliveriesService
  ],
})
export class AppModule {}
