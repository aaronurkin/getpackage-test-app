import { GetDeliveriesRangeDto } from "./get-deliveries-range-dto";

export class GetCourierDeliveriesRangeDto extends GetDeliveriesRangeDto {
    courierId: string;
}