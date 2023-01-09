import { UserRole } from 'src/users/entities/user.entity';
export declare type AllowedRoles = keyof typeof UserRole | 'ANY';
export declare const Role: (roles: AllowedRoles[]) => import("@nestjs/common").CustomDecorator<string>;
