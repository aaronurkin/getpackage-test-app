export class Delivery {
    id: number;
	packageSize: number;
	cost: number;
	name: string;
	description: string;
	date: Date;
	from: string;
	to: string;
    senderId: number;
    assignedTo?: number;
}