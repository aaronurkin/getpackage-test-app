import { DeliveryType } from "src/enums/enum.delivery-type";

export class DeliveryResponse {
    id: string;
    date: Date;
    name: string;
    cost: number;
    type?: DeliveryType;
    description: string;
}