export class PagedListResponse<TItems> {
    constructor(
        items: Array<any>,
        pageNumber: number,
        pageItemsCount: number,
        mapfn: (item: any) => TItems = undefined) {

        const take: number = pageNumber * pageItemsCount;
        const skip: number = Math.max((pageNumber - 1 ) * pageItemsCount, 0);
        const pagedItems = !mapfn ? items.slice(skip, take) : items.slice(skip, take).map(mapfn);

        this.items = pagedItems;
        this.currentPage = pageNumber;
        this.totalItemsCount = items.length;
        this.pageItemsCount = pagedItems.length;
        this.totalPagesCount = Math.ceil(items.length / pageItemsCount);
    }

    currentPage: number;
    items: Array<TItems>;
    pageItemsCount: number;
    totalItemsCount: number;
    totalPagesCount: number;
}