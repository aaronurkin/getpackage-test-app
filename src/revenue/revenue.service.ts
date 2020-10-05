import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DeliveriesService } from 'src/deliveries/deliveries.service';
import { DeliveryEntity } from 'src/entities/delivery.entity';
import { PropertyActionPagedListResponse } from 'src/responses/property-action-paged-list-response';
import { CalculateRevenueDto } from './calculate-revenue.dto';

@Injectable()
export class RevenueService {

    constructor(
        private readonly configService: ConfigService,
        private readonly deliveryService: DeliveriesService) {}

    calculate(model: CalculateRevenueDto) {

        const courierRevenueFee = this.configService.get<number>('COURIER_REVENUE_FEE');
        const deliveries = this.deliveryService.getCourierDeliveries({ courierId: model.courierId });
        const mapfn = (d: DeliveryEntity) => d.cost * courierRevenueFee;
        const reduce = { fn: (previous: any, next: any) => previous + next, initialValue: 0 };

        return new PropertyActionPagedListResponse(deliveries, 1, 5, mapfn, reduce);
    }
}
