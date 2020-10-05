import { InMemoryDBEntity } from "@nestjs-addons/in-memory-db";

export interface UserEntity extends InMemoryDBEntity {
	type: string;
	userName: string;
	password: string;
	createdAt: Date;
}
