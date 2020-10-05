import { InMemoryDBEntity } from "@nestjs-addons/in-memory-db";

export interface DeliveryEntity extends InMemoryDBEntity {
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