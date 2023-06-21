import { CoreOutput } from 'src/common/dtos/output.dto';
export declare class CheckUserRoleInput {
    roleIds: number[];
}
export declare class CheckUserRoleOutput extends CoreOutput {
    confirmed: boolean;
}
