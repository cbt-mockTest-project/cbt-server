import { CoreOutput } from 'src/common/dtos/output.dto';
export declare class UpdateAdblockPermissionInput {
    userId: number;
}
export declare class UpdateAdblockPermissionOutput extends CoreOutput {
    adblockPermission?: boolean;
}
