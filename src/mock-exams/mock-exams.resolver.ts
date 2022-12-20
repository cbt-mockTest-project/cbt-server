import {
  FindMyExamHistoryOutput,
  FindMyExamHistoryInput,
} from './dtos/findMyExamHistory.dto';
import { User } from './../users/entities/user.entity';
import { ReadMockExamOutput, ReadMockExamInput } from './dtos/readMockExam.dto';
import {
  ReadAllMockExamsOutput,
  ReadAllMockExamsInput,
} from './dtos/readAllMockExam.dto';
import {
  CreateMockExamOutput,
  CreateMockExamInput,
} from './dtos/createMockExam.dto';
import { MockExam } from './entities/mock-exam.entity';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MockExamService } from './mock-exams.service';
import { Role } from 'src/auth/role.decorators';
import { EditMockExamOutput, EditMockExamInput } from './dtos/editMockExam.dto';
import {
  DeleteMockExamInput,
  DeleteMockExamOutput,
} from './dtos/deleteMockExam.dto';
import {
  SearchMockExamOutput,
  SearchMockExamInput,
} from './dtos/searchMockExam.dto';
import {
  ReadMockExamTitlesByCateoryOutput,
  ReadMockExamTitlesByCateoryInput,
} from './dtos/readMockExamTitlesByCateory.dto';
import { AuthUser } from 'src/auth/auth-user.decorator';

@Resolver(() => MockExam)
export class MockExamResolver {
  constructor(private readonly mockExamService: MockExamService) {}
  @Mutation(() => CreateMockExamOutput)
  @Role(['ADMIN'])
  createMockExam(
    @Args('input') createMockExamInput: CreateMockExamInput,
  ): Promise<CreateMockExamOutput> {
    return this.mockExamService.createMockExam(createMockExamInput);
  }

  @Mutation(() => EditMockExamOutput)
  @Role(['ADMIN'])
  editMockExam(
    @Args('input') editMockExamInput: EditMockExamInput,
  ): Promise<EditMockExamOutput> {
    return this.mockExamService.editMockExam(editMockExamInput);
  }

  @Mutation(() => DeleteMockExamOutput)
  @Role(['ADMIN'])
  deleteMockExam(
    @Args('input') deleteMockExamInput: DeleteMockExamInput,
  ): Promise<DeleteMockExamOutput> {
    return this.mockExamService.deleteMockExam(deleteMockExamInput);
  }

  @Query(() => ReadAllMockExamsOutput)
  readAllMockExam(
    @Args('input') readAllMockExamsInput: ReadAllMockExamsInput,
  ): Promise<ReadAllMockExamsOutput> {
    return this.mockExamService.readAllMockExam(readAllMockExamsInput);
  }

  @Query(() => SearchMockExamOutput)
  searchMockExam(
    @Args('input') searchMockExamInput: SearchMockExamInput,
  ): Promise<SearchMockExamOutput> {
    return this.mockExamService.searchMockExam(searchMockExamInput);
  }

  @Query(() => ReadMockExamOutput)
  readMockExam(
    @Args('input') readMockExamInput: ReadMockExamInput,
  ): Promise<ReadMockExamOutput> {
    return this.mockExamService.readMockExam(readMockExamInput);
  }

  @Query(() => ReadMockExamTitlesByCateoryOutput)
  async readMockExamTitlesByCateory(
    @Args('input')
    readMockExamTitlesByCateoryInput: ReadMockExamTitlesByCateoryInput,
  ): Promise<ReadMockExamTitlesByCateoryOutput> {
    return this.mockExamService.readMockExamTitlesByCateory(
      readMockExamTitlesByCateoryInput,
    );
  }

  @Query(() => FindMyExamHistoryOutput)
  async findMyExamHistory(
    @AuthUser() user: User,
    @Args('input') findMyExamHistoryInput: FindMyExamHistoryInput,
  ): Promise<FindMyExamHistoryOutput> {
    return this.mockExamService.findMyExamHistory(user, findMyExamHistoryInput);
  }
}
