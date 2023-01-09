import { RevalidateInput, RevalidateOutput } from './dto/revalidate.dto';
import { RevalidateService } from './revalidate.service';
export declare class RevalidateResolver {
    private readonly revalidateService;
    constructor(revalidateService: RevalidateService);
    revalidate(revalidateInput: RevalidateInput): Promise<RevalidateOutput>;
}
