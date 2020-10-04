import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PagedListResponse } from 'src/responses/pagedList.response';
import { Delivery } from '../entities/delivery.entity';
import { GetPagedDeliveriesRequest } from '../requests/get-paged-deliveries.request';

@Injectable()
export class DeliveriesService {

    private deliveries: Array<Delivery>;

    constructor() {
        this.deliveries = [];
    }

    async create(delivery: Delivery): Promise<Delivery> {

        delivery.id = this.deliveries.length + 1;
        this.deliveries.push(delivery);

        return delivery;
    }

    async assign(model: Partial<Delivery>): Promise<Delivery> {

        const dateTo = new Date(model.date);
        const dateFrom = new Date(model.date);

        dateFrom.setHours(0, 0, 0, 0);
        dateTo.setHours(23, 59, 59, 999);

        const deliveries = this.deliveries.filter(d => d.assignedTo === model.assignedTo && d.date >= dateFrom && d.date <= dateTo);

        if (deliveries.length >= 5) {
            //TODO: What options the sender has to get instead of the exception?
            //  - Assign the delivery to another courier?
            //  - Assign the delivery to the courier on another date?
            throw new BadRequestException("The courier has maximum deliveries assigned");
        }

        const delivery = this.deliveries.find(d => d.id == model.id && d.senderId == model.senderId);

        if (!delivery) {
            throw new NotFoundException("Delivery was not found");
        }

        if (delivery.senderId != model.senderId) {
            throw new ForbiddenException();
        }

        if (!delivery.assignedTo) {

            delivery.assignedTo = model.assignedTo;
            this.deliveries[this.deliveries.findIndex(d => d.id === delivery.id)] = delivery;

        } else if(delivery.assignedTo != model.assignedTo) {

            throw new ConflictException('Delivery has already been assigned');
        }

        return delivery;
    }

    async getPagedSenderDeliveries(model: GetPagedDeliveriesRequest): Promise<PagedListResponse<Delivery>> {

        const paged = new PagedListResponse<Delivery>(this.deliveries.filter(d => d.senderId == model.userId), model.pageNumber, model.pageItemsCount);

        if (!paged.items || paged.items.length == 0) {
            throw new NotFoundException("Deliveries created by you were not found");
        }

        return paged;
    }

    async getPagedCourierDeliveries(model: GetPagedDeliveriesRequest): Promise<PagedListResponse<Delivery>> {

        const paged = new PagedListResponse<Delivery>(this.deliveries.filter(d => d.assignedTo == model.userId), model.pageNumber, model.pageItemsCount);

        if (!paged.items || paged.items.length == 0) {
            throw new NotFoundException("Deliveries assigned to you were not found");
        }

        return paged;
    }
}
