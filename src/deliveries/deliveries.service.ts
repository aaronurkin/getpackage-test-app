import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { DeliveryType } from 'src/enums/enum.delivery-type';
import { PagedListResponse } from 'src/responses/paged-list.response';
import { DeliveryEntity } from '../entities/delivery.entity';
import { GetPagedDeliveriesRequest } from '../requests/get-paged-deliveries.request';

@Injectable()
export class DeliveriesService {

    constructor(private readonly db: InMemoryDBService<DeliveryEntity>) {

        const deliveries: Array<Partial<DeliveryEntity>> = [
            {
                cost: 20.5,
                from: "Tel Aviv",
                packageSize: 12.5,
                to: "Rishon LeZion",
                name: "Test Delivery 1",
                description: "My test delivery 1",
                id: "792d0b94-af8f-489c-b4a9-16a32445f985",
                senderId: "2ff85781-7adb-484f-a70b-86adacd22242"
            },
            {
                cost: 27.8,
                from: "Rishon LeZion",
                packageSize: 22.5,
                to: "Tel Aviv",
                name: "Test Delivery 2",
                description: "My test delivery 2",
                id: "792d0b94-af8f-489c-b4a9-16a32445f986",
                senderId: "2ff85781-7adb-484f-a70b-86adacd22242"
            },
            {
                cost: 120.7,
                from: "Tel Aviv",
                packageSize: 1.9,
                to: "Haifa",
                name: "Test Delivery 3",
                description: "My test delivery 3",
                id: "792d0b94-af8f-489c-b4a9-16a32445f987",
                senderId: "2ff85781-7adb-484f-a70b-86adacd22242"
            }
        ];

        deliveries.forEach(delivery => this.create(delivery));

        deliveries[0].assignedTo = "58384f11-62e0-4397-8c94-16a43bde8fd8";
        deliveries[2].assignedTo = "58384f11-62e0-4397-8c94-16a43bde8fd8";

        this.assign(deliveries[0]);
        this.assign(deliveries[2]);
    }

    async create(model: Partial<DeliveryEntity>): Promise<DeliveryEntity> {

        const delivery = model as DeliveryEntity;

        delivery.type = DeliveryType.awaiting;
        delivery.dateCreated = new Date();

        return this.db.create(delivery);
    }

    async assign(model: Partial<DeliveryEntity>): Promise<DeliveryEntity> {

        const dateTo = new Date(model.date);
        const dateFrom = new Date(model.date);

        dateFrom.setHours(0, 0, 0, 0);
        dateTo.setHours(23, 59, 59, 999);

        const deliveries = this.db.query(d => d.assignedTo === model.assignedTo && d.date >= dateFrom && d.date <= dateTo);

        if (deliveries.length >= 5) {
            //TODO: What options the sender has to get instead of the exception?
            //  - Assign the delivery to another courier?
            //  - Assign the delivery to the courier on another date?
            throw new BadRequestException("The courier has maximum deliveries assigned");
        }

        const delivery = this.db.get(model.id);

        if (!delivery) {
            throw new NotFoundException("Delivery was not found");
        }

        if (delivery.senderId != model.senderId) {
            throw new ForbiddenException();
        }

        if (!delivery.assignedTo) {

            delivery.dateAssigned = new Date();
            delivery.type = DeliveryType.assigned;
            delivery.assignedTo = model.assignedTo;

            this.db.update(delivery);

        } else if(delivery.assignedTo != model.assignedTo) {

            throw new ConflictException('Delivery has already been assigned');
        }

        return delivery;
    }

    async getPagedSenderDeliveries(model: GetPagedDeliveriesRequest): Promise<PagedListResponse<DeliveryEntity>> {

        const paged = new PagedListResponse<DeliveryEntity>(this.db.query(d => d.senderId == model.userId), model.pageNumber, model.pageItemsCount);

        if (!paged.items || paged.items.length == 0) {
            throw new NotFoundException("Deliveries created by you were not found");
        }

        return paged;
    }

    async getPagedCourierDeliveries(model: GetPagedDeliveriesRequest): Promise<PagedListResponse<DeliveryEntity>> {

        const paged = new PagedListResponse<DeliveryEntity>(this.db.query(d => d.assignedTo == model.userId), model.pageNumber, model.pageItemsCount);

        if (!paged.items || paged.items.length == 0) {
            throw new NotFoundException("Deliveries assigned to you were not found");
        }

        return paged;
    }
}
