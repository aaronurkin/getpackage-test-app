import { UserType } from "src/enums/enum.user-type"

export class CreateUserRequest {
    type: UserType;
    userName: string;
    password: string;
}