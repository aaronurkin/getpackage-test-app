import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class UserTypeGuard implements CanActivate {

    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {

        const userTypes = this.reflector.get<string[]>('allowedUserTypes', context.getHandler());

        if (!userTypes) {
            return true;
        }
 
        const request = context.switchToHttp().getRequest();

        return request.user && request.user.type && userTypes.includes(request.user.type);
    }
}