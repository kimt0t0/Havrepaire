
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/resources/users/enums/role.enum';
import { decodeToken } from 'src/utils/token.utils';
import * as util from 'util'

@Injectable()
export class OwnerGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const datas = context.switchToHttp().getRequest();
        const token = datas.rawHeaders.find(header => header.startsWith('Bearer ')).replace('Bearer ', '').replace(' ', '');
        const decodedToken = decodeToken(token);
        return (decodedToken._id === '64f9e36ee212edde08eb4858' || decodedToken.role === Role.ADMIN);
    }
}
