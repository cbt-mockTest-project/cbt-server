import { ReadMockExamQuestionsByMockExamIdOutput, ReadMockExamQuestionsByMockExamIdInput } from './dtos/readMockExamQuestionsByMockExamId.dto';
import { ReadMockExamQuestionOutput, ReadMockExamQuestionInput } from './dtos/readMockExamQuestion.dto';
import { UpdateApprovedStateOfMockExamQuestionOutput, UpdateApprovedStateOfMockExamQuestionInput } from './dtos/updateApprovedStateOfMockExamQuestion.dto';
import { ReadMockExamQuestionNumbersInput, ReadMockExamQuestionNumbersOutput } from './dtos/readMockExamQuestionNumbers.dto';
import { User } from 'src/users/entities/user.entity';
import { ReadAllMockExamQuestionOutput } from './dtos/readAllMockExamQuestion.dto';
import { CreateMockExamQuestionInput, CreateMockExamQuestionOutput } from './dtos/createMockExamQuestion.dto';
import { MockExamQuestionService } from './mock-exams-question.service';
import { EditMockExamQuestionOutput, EditMockExamQuestionInput } from './dtos/editMockExamQuestion.dto';
import { DeleteMockExamQuestionInput, DeleteMockExamQuestionOutput } from './dtos/deleteMockExamQuestion.dto';
import { ReadMockExamQuestionsByStateInput, ReadMockExamQuestionsByStateOutput } from './dtos/readMockExamQuestionsByState.dto';
import { ReadAllQuestionsOutput } from './dtos/readAllQuestions.dto';
export declare class MockExamQuestionResolver {
    private readonly mockExamQuestionService;
    constructor(mockExamQuestionService: MockExamQuestionService);
    createMockExamQuestion(user: User, createMockExamQuestionInput: CreateMockExamQuestionInput): Promise<CreateMockExamQuestionOutput>;
    editMockExamQuestion(user: User, editMockExamQuestionInput: EditMockExamQuestionInput): Promise<EditMockExamQuestionOutput>;
    deleteMockExamQuestion(user: User, deleteMockExamQuestionInput: DeleteMockExamQuestionInput): Promise<DeleteMockExamQuestionOutput>;
    readAllMockExamQuestion(user: User): Promise<ReadAllMockExamQuestionOutput>;
    readMockExamQuestionsByState(user: User, readMockExamQuestionsByStateInput: ReadMockExamQuestionsByStateInput): Promise<ReadMockExamQuestionsByStateOutput>;
    readMockExamQuestionNumbers(readMockExamQuestionNumbersInput: ReadMockExamQuestionNumbersInput): Promise<ReadMockExamQuestionNumbersOutput>;
    readMockExamQuestion(user: User, readMockExamQuestionInput: ReadMockExamQuestionInput): Promise<ReadMockExamQuestionOutput>;
    updateApprovedStateOfMockExamQuestion(updateApprovedStateOfMockExamQuestionInput: UpdateApprovedStateOfMockExamQuestionInput): Promise<UpdateApprovedStateOfMockExamQuestionOutput>;
    readMockExamQuestionsByMockExamId(user: User, readMockExamQuestionsByMockExamIdInput: ReadMockExamQuestionsByMockExamIdInput): Promise<ReadMockExamQuestionsByMockExamIdOutput>;
    readAllQuestions(): Promise<ReadAllQuestionsOutput>;
}
