import { PagedListResponse } from "./paged-list.response";

export class PropertyActionPagedListResponse<TItems> extends PagedListResponse<TItems> {
    constructor(
        items: Array<any>,
        pageNumber: number,
        pageItemsCount: number,
        mapfn: (item: any) => any,
        reduce: { fn: (previous: any, next: any) => any, initialValue: any } = undefined,
        mapResutlFn: (item: any) => TItems = undefined) {

        super(items, pageNumber, pageItemsCount, mapResutlFn);

        this.resultTotal = !reduce ? items.map(mapfn) : items.map(mapfn).reduce(reduce.fn, reduce.initialValue);
        this.resultPage = !reduce ? this.items.map(mapfn) : items.map(mapfn).reduce(reduce.fn, reduce.initialValue);
    }

    resultPage: any;
    resultTotal: any;
}