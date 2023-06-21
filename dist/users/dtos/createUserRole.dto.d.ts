import { CoreOutput } from 'src/common/dtos/output.dto';
export declare class CreateUserRoleInput {
    userId: number;
    roleId: number;
}
export declare class CreateUserRoleOutput extends CoreOutput {
    roleId?: number;
}
