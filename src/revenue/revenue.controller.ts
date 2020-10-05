import { Controller, Get, UseGuards, Request, Query } from '@nestjs/common';
import { AllowedUserTypes } from 'src/decorators/allowed-user-types.decorator';
import { UserType } from 'src/enums/enum.user-type';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UserTypeGuard } from 'src/guards/user-type.guard';
import { PagedListRequest } from 'src/requests/pagedList.request';
import { RevenueService } from './revenue.service';

@Controller('revenue')
export class RevenueController {

    constructor(private readonly service: RevenueService) {}

    @AllowedUserTypes(UserType.courier)
    @UseGuards(JwtAuthGuard, UserTypeGuard)
    @Get()
    get(@Query() query: PagedListRequest, @Request() request) {
        return this.service.calculate({
            courierId: request.user.id,
            dateFrom: query.dateFrom,
            dateTo: query.dateTo,
            pageNumber: query.pageNumber,
            pageItemsCount: query.pageItemsCount
        });
    }
}
