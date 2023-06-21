import { User } from 'src/users/entities/user.entity';
import { ReadQuestionCardInput, ReadQuestionCardOutput } from './dtos/readQuestionCard.dto';
import { QuestionCardCategory } from './entities/question-card-category';
import { QuestionCard } from './entities/question-card.entity';
import { Repository } from 'typeorm';
import { ReadMyQuestionCardsOutput, ReadMyQuestionCardsInput } from './dtos/readMyQuestionCards.dto';
import { CreateQuestionCardInput, CreateQuestionCardOutput } from './dtos/createQuestionCard.dto';
import { UpdateQuestionCardInput, UpdateQuestionCardOutput } from './dtos/updateQuestionCard.dto';
import { DeleteQuestionCardsInput, DeleteQuestionCardsOutput } from './dtos/deleteQuestionCard.dto';
export declare class QuestionCardService {
    private readonly questionCard;
    private readonly questionCardCategory;
    constructor(questionCard: Repository<QuestionCard>, questionCardCategory: Repository<QuestionCardCategory>);
    readQuestionCard(readQusetionCardInput: ReadQuestionCardInput): Promise<ReadQuestionCardOutput>;
    readMyQuestionCards(readMyQuestionCardsInput: ReadMyQuestionCardsInput, user: User): Promise<ReadMyQuestionCardsOutput>;
    createQuestionCard(user: User, createQuestionCardInput: CreateQuestionCardInput): Promise<CreateQuestionCardOutput>;
    updateQuestionCard(user: User, updateQuestionCardInput: UpdateQuestionCardInput): Promise<UpdateQuestionCardOutput>;
    deleteQuestionCards(deleteQuestionCardInput: DeleteQuestionCardsInput, user: User): Promise<DeleteQuestionCardsOutput>;
}
