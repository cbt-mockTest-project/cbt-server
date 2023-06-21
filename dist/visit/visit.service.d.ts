import { CreateVisitHistoryOutput } from './dtos/createVisitHistory.dto';
import { VisitHistory } from 'src/visit/entities/visitHistory.entity';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { ReadVisitCountOutput } from './dtos/readVisitCount.dto';
import { Visit } from './entities/visit.entity';
import { ReadVisitHistoryOutput } from './dtos/readVisitHistory.dto';
export declare class VisitService {
    private readonly visit;
    private readonly visitHistory;
    constructor(visit: Repository<Visit>, visitHistory: Repository<VisitHistory>);
    createVisit(user: User): Promise<CoreOutput>;
    clearVisit(): Promise<CoreOutput>;
    readVisitCount(): Promise<ReadVisitCountOutput>;
    createVisitHistory(): Promise<CreateVisitHistoryOutput>;
    readVisitHistory(): Promise<ReadVisitHistoryOutput>;
}
