export class CreateDeliveryDto {
	name: string;
    cost: number;
	packageSize: number;
	description: string;
	assignedTo?: number;
	from: string;
	to: string;
}