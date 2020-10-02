import { IsInt } from 'class-validator';

export class PagedListRequest {

    @IsInt()
    pageNumber: number;

    @IsInt()
    pageItemsCount: number;
}