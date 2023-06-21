import { ZepUser } from './entities/zepUser.entity';
import { Repository } from 'typeorm';
import { UpdateZepUserInput, UpdateZepUserOutput } from './dtos/zepUser/updateZepUser.dto';
import { GetZepUserOutput } from './dtos/zepUser/getZepUser.dto';
export declare class ZepUserService {
    private readonly zepUser;
    constructor(zepUser: Repository<ZepUser>);
    updateZepUser(updateZepUserInput: UpdateZepUserInput): Promise<UpdateZepUserOutput>;
    getZepUser(id: string): Promise<GetZepUserOutput>;
}
