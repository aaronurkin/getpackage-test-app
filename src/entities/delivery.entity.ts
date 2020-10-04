export class Delivery {
	id: number;
	type: string;
	packageSize: number;
	cost: number;
	name: string;
	description: string;
	date: Date;
	from: string;
	to: string;
    senderId: number;
    assignedTo?: number;
	dateCreated: Date;
	dateAssigned?: Date;
}