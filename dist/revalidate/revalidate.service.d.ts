import { RevalidateModuleOptions } from './revalidate.interface';
import { RevalidateInput, RevalidateOutput } from './dto/revalidate.dto';
export declare class RevalidateService {
    private readonly options;
    constructor(options: RevalidateModuleOptions);
    revalidate(revalidateInput: RevalidateInput): Promise<RevalidateOutput>;
}
