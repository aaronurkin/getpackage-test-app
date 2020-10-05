import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { Module } from '@nestjs/common';
import { DeliveriesService } from 'src/deliveries/deliveries.service';
import { RevenueController } from './revenue.controller';
import { RevenueService } from './revenue.service';

@Module({
  imports: [
    InMemoryDBModule.forRoot({})
],
controllers: [RevenueController],
  providers: [
    RevenueService,
    DeliveriesService
  ]
})
export class RevenueModule {}
