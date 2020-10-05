import { Type } from 'class-transformer';
import { IsDate, IsInt } from 'class-validator';

export class PagedListRequest {

    @Type(() => Number)
    @IsInt()
    pageNumber: number;

    @Type(() => Number)
    @IsInt()
    pageItemsCount: number;

    @Type(() => Date)
    @IsDate()
    dateFrom: Date;

    @Type(() => Date)
    @IsDate()
    dateTo: Date;
}