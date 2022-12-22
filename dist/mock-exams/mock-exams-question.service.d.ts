import { ReadMockExamQuestionsByMockExamIdInput, ReadMockExamQuestionsByMockExamIdOutput } from './dtos/readMockExamQuestionsByMockExamId.dto';
import { ReadMockExamQuestionInput, ReadMockExamQuestionOutput } from './dtos/readMockExamQuestion.dto';
import { UpdateApprovedStateOfMockExamQuestionInput, UpdateApprovedStateOfMockExamQuestionOutput } from './dtos/updateApprovedStateOfMockExamQuestion.dto';
import { MockExamQuestionState } from './entities/mock-exam-question-state.entity';
import { ReadAllMockExamQuestionOutput } from './dtos/readAllMockExamQuestion.dto';
import { EditMockExamQuestionInput, EditMockExamQuestionOutput } from './dtos/editMockExamQuestion.dto';
import { MockExam } from './entities/mock-exam.entity';
import { Repository } from 'typeorm';
import { CreateMockExamQuestionInput, CreateMockExamQuestionOutput } from './dtos/createMockExamQuestion.dto';
import { MockExamQuestion } from './entities/mock-exam-question.entity';
import { DeleteMockExamQuestionInput, DeleteMockExamQuestionOutput } from './dtos/deleteMockExamQuestion.dto';
import { User } from 'src/users/entities/user.entity';
import { ReadMockExamQuestionsByStateInput, ReadMockExamQuestionsByStateOutput } from './dtos/readMockExamQuestionsByState.dto';
import { ReadMockExamQuestionNumbersInput, ReadMockExamQuestionNumbersOutput } from './dtos/readMockExamQuestionNumbers.dto';
export declare class MockExamQuestionService {
    private readonly mockExamQuestion;
    private readonly mockExam;
    private readonly mockExamQuestionState;
    constructor(mockExamQuestion: Repository<MockExamQuestion>, mockExam: Repository<MockExam>, mockExamQuestionState: Repository<MockExamQuestionState>);
    createMockExamQuestion(createMockExamQuestionInput: CreateMockExamQuestionInput): Promise<CreateMockExamQuestionOutput>;
    updateApprovedStateOfMockExamQuestion(updateApprovedStateOfMockExamQuestionInput: UpdateApprovedStateOfMockExamQuestionInput): Promise<UpdateApprovedStateOfMockExamQuestionOutput>;
    readMockExamQuestion(readMockExamQuestionInput: ReadMockExamQuestionInput, userId: number): Promise<ReadMockExamQuestionOutput>;
    editMockExamQuestion(editMockExamQuestionInput: EditMockExamQuestionInput): Promise<EditMockExamQuestionOutput>;
    deleteMockExamQuestion(deleteMockExamQuestionInput: DeleteMockExamQuestionInput): Promise<DeleteMockExamQuestionOutput>;
    readAllMockExamQuestion(): Promise<ReadAllMockExamQuestionOutput>;
    readMockExamQuestionsByMockExamId(readMockExamQuestionsByMockExamIdInput: ReadMockExamQuestionsByMockExamIdInput, user: User): Promise<ReadMockExamQuestionsByMockExamIdOutput>;
    readMockExamQuestionNumbers(readMockExamQuestionNumbersInput: ReadMockExamQuestionNumbersInput): Promise<ReadMockExamQuestionNumbersOutput>;
    readMockExamQuestionsByState(user: User, readMockExamQuestionsByStateInput: ReadMockExamQuestionsByStateInput): Promise<ReadMockExamQuestionsByStateOutput>;
}
