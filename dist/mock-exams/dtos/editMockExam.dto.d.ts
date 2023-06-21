import { ExamStatus } from './../entities/mock-exam.entity';
import { CoreOutput } from '../../common/dtos/output.dto';
import { MockExam } from '../entities/mock-exam.entity';
declare const EditMockExamInput_base: import("@nestjs/common").Type<Pick<MockExam, "id">>;
export declare class EditMockExamInput extends EditMockExamInput_base {
    status?: ExamStatus;
    title?: string;
}
export declare class EditMockExamOutput extends CoreOutput {
}
export {};
