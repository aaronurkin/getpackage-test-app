import { SetMetadata } from "@nestjs/common";

export const AllowedUserTypes = (...userTypes: string[]) => SetMetadata('allowedUserTypes', userTypes);