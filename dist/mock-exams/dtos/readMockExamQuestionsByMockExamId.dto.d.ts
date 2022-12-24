import { MockExamQuestion } from '../entities/mock-exam-question.entity';
import { CoreOutput } from '../../common/dtos/output.dto';
import { MockExam } from '../entities/mock-exam.entity';
declare const ReadMockExamQuestionsByMockExamIdInput_base: import("@nestjs/common").Type<Pick<MockExam, "id">>;
export declare class ReadMockExamQuestionsByMockExamIdInput extends ReadMockExamQuestionsByMockExamIdInput_base {
    isRandom?: boolean;
}
export declare class ReadMockExamQuestionsByMockExamIdOutput extends CoreOutput {
    questions?: MockExamQuestion[];
    count?: number;
    title?: string;
}
export {};
