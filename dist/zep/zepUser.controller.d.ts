import { ZepUserService } from './zepUser.service';
import { UpdateZepUserInput, UpdateZepUserOutput } from './dtos/zepUser/updateZepUser.dto';
import { GetZepUserOutput } from './dtos/zepUser/getZepUser.dto';
export declare class ZepUserController {
    private readonly zepUserService;
    constructor(zepUserService: ZepUserService);
    updateZepUser(updateZepUserInput: UpdateZepUserInput): Promise<UpdateZepUserOutput>;
    getZepUser(id: string): Promise<GetZepUserOutput>;
}
