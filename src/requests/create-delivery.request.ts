export class CreateDeliveryRequest {
	name: string;
    cost: number;
	packageSize: number;
	description: string;
	assignedTo?: string;
	from: string;
	to: string;
	date: Date;
}