import { CoreOutput } from 'src/common/dtos/output.dto';
export declare class GetRoleCountInput {
    roleId: number;
}
export declare class GetRoleCountOutput extends CoreOutput {
    count?: number;
}
