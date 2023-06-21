import { CreateVisitHistoryOutput } from './dtos/createVisitHistory.dto';
import { User } from './../users/entities/user.entity';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { VisitService } from './visit.service';
import { ReadVisitCountOutput } from './dtos/readVisitCount.dto';
import { ReadVisitHistoryOutput } from './dtos/readVisitHistory.dto';
export declare class VisitResolver {
    private readonly visitService;
    constructor(visitService: VisitService);
    createVisit(user: User): Promise<CoreOutput>;
    readVisitCount(): Promise<ReadVisitCountOutput>;
    createVisitHistory(): Promise<CreateVisitHistoryOutput>;
    readVisitHistory(): Promise<ReadVisitHistoryOutput>;
}
