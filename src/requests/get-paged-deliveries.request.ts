export class GetPagedDeliveriesRequest {
    userId: string;
    pageNumber: number;
    pageItemsCount: number;
    dateFrom: Date;
    dateTo: Date;
}