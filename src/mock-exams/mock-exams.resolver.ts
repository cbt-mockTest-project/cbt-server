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
import {
  UpdateExamOrderInput,
  UpdateExamOrderOutput,
} from './dtos/updateExamOrder.dto';
import { GetMyExamsOutput } from './dtos/getMyExams.dto';

@Resolver(() => MockExam)
export class MockExamResolver {
  constructor(private readonly mockExamService: MockExamService) {}
  @Mutation(() => CreateMockExamOutput)
  @Role(['ANY'])
  createMockExam(
    @AuthUser() user: User,
    @Args('input') createMockExamInput: CreateMockExamInput,
  ): Promise<CreateMockExamOutput> {
    return this.mockExamService.createMockExam(user, createMockExamInput);
  }

  @Mutation(() => EditMockExamOutput)
  @Role(['ANY'])
  editMockExam(
    @AuthUser() user: User,
    @Args('input') editMockExamInput: EditMockExamInput,
  ): Promise<EditMockExamOutput> {
    return this.mockExamService.editMockExam(user, editMockExamInput);
  }

  @Mutation(() => DeleteMockExamOutput)
  @Role(['ANY'])
  deleteMockExam(
    @AuthUser() user,
    @Args('input') deleteMockExamInput: DeleteMockExamInput,
  ): Promise<DeleteMockExamOutput> {
    return this.mockExamService.deleteMockExam(user, deleteMockExamInput);
  }

  @Mutation(() => UpdateExamOrderOutput)
  @Role(['ANY'])
  updateExamOrder(
    @AuthUser() user: User,
    @Args('input') updateExamOrderInput: UpdateExamOrderInput,
  ): Promise<UpdateExamOrderOutput> {
    return this.mockExamService.updateExamOrder(user, updateExamOrderInput);
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
    @AuthUser() user: User,
  ): Promise<ReadMockExamTitlesByCateoryOutput> {
    return this.mockExamService.readMockExamTitlesByCateory(
      user,
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

  @Role(['ANY'])
  @Query(() => GetMyExamsOutput)
  async getMyExams(@AuthUser() user: User): Promise<GetMyExamsOutput> {
    return this.mockExamService.getMyExams(user);
  }
}
