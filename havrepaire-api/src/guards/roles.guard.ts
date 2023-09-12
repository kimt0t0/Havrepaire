
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
import { Role } from 'src/resources/users/enums/role.enum';
import { decodeToken } from 'src/utils/token.utils';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const datas = context.switchToHttp().getRequest();
        const token = datas.rawHeaders.find(header => header.startsWith('Bearer ')).replace('Bearer ', '').replace(' ', '');
        console.log(`token: ${token}`)
        const decodedToken = decodeToken(token);
        console.log(`Expected roles: ${requiredRoles} --- User role: ${JSON.stringify(decodedToken)}`);
        return requiredRoles.some((role) => decodedToken === role);
    }
}
