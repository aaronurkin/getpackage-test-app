import { BadRequestException, Body, Controller, Get, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { PagedListRequest } from 'src/requests/pagedList.request';
import { PagedListResponse } from 'src/responses/pagedList.response';
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { AllowedUserTypes } from 'src/decorators/allowed-user-types.decorator';
import { UserTypeGuard } from 'src/guards/user-type.guard';
import { UserType } from 'src/users/enum.user-type';
import { CreateDeliveryDto } from '../requests/create-delivery.dto';
import { DeliveriesService } from './deliveries.service';
import { AssignDeliveryDto } from '../requests/assign-delivery.dto';
import { SenderDeliveryDto } from '../responses/sender-delivery.dto';
import { GetPagedDeliveriesDto } from '../requests/get-paged-deliveries.dto';
import { CourierDeliveryDto } from '../responses/courier-delivery.dto';

@Controller('deliveries')
export class DeliveriesController {

    constructor(private readonly service: DeliveriesService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getPage(@Query() query : PagedListRequest, @Request() request) : Promise<PagedListResponse<SenderDeliveryDto> | PagedListResponse<CourierDeliveryDto>> {

        // TODO: Replace data transfer object initialization with mapper call
        const model: GetPagedDeliveriesDto = {
            userId: request.user.id,
            pageNumber: query.pageNumber,
            pageItemsCount: query.pageItemsCount
        };

       switch (request.user.type) {
            case UserType.sender:
                const senderDeliveries = await this.service.getPagedSenderDeliveries(model);
                // TODO: Replace result initialization with mapper call
                return {
                    currentPage: senderDeliveries.currentPage,
                    pageItemsCount: senderDeliveries.pageItemsCount,
                    totalItemsCount: senderDeliveries.totalItemsCount,
                    totalPagesCount: senderDeliveries.totalPagesCount,
                    items: senderDeliveries.items.map<SenderDeliveryDto>(delivery => {
                        return {
                            id: delivery.id,
                            name: delivery.name,
                            cost: delivery.cost,
                            date: delivery.date,
                            assignedTo: delivery.assignedTo,
                            description: delivery.description
                        };
                    })
                };
            case UserType.courier:
                const courierDeliveries = await this.service.getPagedCourierDeliveries(model);
                // TODO: Replace result initialization with mapper call
                return {
                    currentPage: courierDeliveries.currentPage,
                    pageItemsCount: courierDeliveries.pageItemsCount,
                    totalItemsCount: courierDeliveries.totalItemsCount,
                    totalPagesCount: courierDeliveries.totalPagesCount,
                    items: courierDeliveries.items.map<CourierDeliveryDto>(delivery => {
                        return {
                            id: delivery.id,
                            name: delivery.name,
                            cost: delivery.cost,
                            date: delivery.date,
                            senderId: delivery.senderId,
                            description: delivery.description
                        };
                    })
                };
            default:
                throw new BadRequestException();
       }
    }

    @AllowedUserTypes(UserType.sender)
    @UseGuards(JwtAuthGuard, UserTypeGuard)
    @Post('add')
    async add(@Body() model : CreateDeliveryDto, @Request() request): Promise<SenderDeliveryDto> {

        // TODO: Replace delivery initialization with mapper call
        const delivery = await this.service.create({
            id: null,
            to: model.to,
            from: model.from,
            cost: model.cost,
            name: model.name,
            date: new Date(),
            senderId: request.user.id,
            assignedTo: model.assignedTo,
            description: model.description,
            packageSize: model.packageSize
        });

        return {
            id: delivery.id,
            name: delivery.name,
            cost: delivery.cost,
            date: delivery.date,
            assignedTo: delivery.assignedTo,
            description: delivery.description
        };
    }

    @AllowedUserTypes(UserType.sender)
    @UseGuards(JwtAuthGuard, UserTypeGuard)
    @Put('assign')
    async assign(@Body() model : AssignDeliveryDto, @Request() request): Promise<SenderDeliveryDto> {

        const delivery = await this.service.assign({
            date: model.date,
            id: model.deliveryId,
            senderId: request.user.id,
            assignedTo: model.courierId
        });

        return {
            id: delivery.id,
            name: delivery.name,
            cost: delivery.cost,
            date: delivery.date,
            assignedTo: delivery.assignedTo,
            description: delivery.description
        };
    }
}
