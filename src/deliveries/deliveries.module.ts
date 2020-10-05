import { Module } from '@nestjs/common';
import { DeliveriesService } from './deliveries.service';
import { DeliveriesController } from './deliveries.controller';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';

@Module({
    imports: [
        InMemoryDBModule.forRoot({})
    ],
    providers: [
        DeliveriesService
    ],
    controllers: [
        DeliveriesController
    ]
})
export class DeliveriesModule {}
