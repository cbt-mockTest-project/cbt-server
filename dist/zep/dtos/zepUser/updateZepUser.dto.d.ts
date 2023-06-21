import { CoreOutput } from 'src/common/dtos/output.dto';
import { ZepUser } from 'src/zep/entities/zepUser.entity';
export declare class UpdateZepUserInput {
    nickname: string;
    zepId: string;
}
export declare class UpdateZepUserOutput extends CoreOutput {
    zepUser?: ZepUser;
}
