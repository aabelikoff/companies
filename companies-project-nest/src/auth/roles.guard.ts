import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Role } from './role.enum';
import { User } from 'src/users/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.get<Role[]>(
      ROLES_KEY,
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true; // Если роли не требуются, разрешаем доступ
    }
    const request = context.switchToHttp().getRequest();
    const user: User = request.user; // Предполагается, что пользователь хранится в запросе

    return requiredRoles.some((role) => user.role === role);
  }
}
