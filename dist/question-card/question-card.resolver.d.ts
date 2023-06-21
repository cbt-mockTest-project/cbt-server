import { DeleteQuestionCardsInput, DeleteQuestionCardsOutput } from './dtos/deleteQuestionCard.dto';
import { User } from 'src/users/entities/user.entity';
import { ReadMyQuestionCardsInput, ReadMyQuestionCardsOutput } from './dtos/readMyQuestionCards.dto';
import { ReadQuestionCardInput, ReadQuestionCardOutput } from './dtos/readQuestionCard.dto';
import { QuestionCardService } from './question-card.service';
import { CreateQuestionCardInput, CreateQuestionCardOutput } from './dtos/createQuestionCard.dto';
import { UpdateQuestionCardOutput, UpdateQuestionCardInput } from './dtos/updateQuestionCard.dto';
export declare class QuestionCardResolver {
    private readonly questionCardService;
    constructor(questionCardService: QuestionCardService);
    readQuestionCard(readQusetionCardInput: ReadQuestionCardInput): Promise<ReadQuestionCardOutput>;
    readMyQuestionCards(readMyQuestionCardsInput: ReadMyQuestionCardsInput, user: User): Promise<ReadMyQuestionCardsOutput>;
    createQuestionCard(createQuestionCardInput: CreateQuestionCardInput, user: User): Promise<CreateQuestionCardOutput>;
    updateQuestionCard(updateQuestionCardInput: UpdateQuestionCardInput, user: User): Promise<UpdateQuestionCardOutput>;
    deleteQuestionCards(deleteQuestionCardsInput: DeleteQuestionCardsInput, user: User): Promise<DeleteQuestionCardsOutput>;
}
