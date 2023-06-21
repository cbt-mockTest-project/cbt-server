import { CoreOutput } from 'src/common/dtos/output.dto';
import { ZepUser } from 'src/zep/entities/zepUser.entity';
export declare class GetZepUserInput {
    zepId: string;
}
export declare class GetZepUserOutput extends CoreOutput {
    zepUser?: ZepUser;
}
