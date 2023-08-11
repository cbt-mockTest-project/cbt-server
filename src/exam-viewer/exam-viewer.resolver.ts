import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { ExamViewer } from './entities/exam-viewer.entity';
import { ExamViewerService } from './exam-viewer.service';
import {
  CreateExamCategoryViewerInput,
  CreateExamCategoryViewerOutput,
} from './dtos/createExamCategoryViewer.dto';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/auth/role.decorators';
import {
  GetExamCategoryViewrsInput,
  GetExamCategoryViewrsOutput,
} from './dtos/getExamCategoryViewers.dto';
import {
  DeleteExamCategoryViewerInput,
  DeleteExamCategoryViewerOutput,
} from './dtos/deleteExamCategoryViewer.dto';
import {
  UpdateExamViewerArroveStateInput,
  UpdateExamViewerArroveStateOutput,
} from './dtos/updateExamViewerArroveState.dto';

@Resolver(() => ExamViewer)
export class ExamViewerResolver {
  constructor(private readonly examViewerService: ExamViewerService) {}

  @Role(['ANY'])
  @Mutation(() => CreateExamCategoryViewerOutput)
  async createExamCategoryViewer(
    @Args('input') createExamCategoryViewerInput: CreateExamCategoryViewerInput,
    @AuthUser() user: User,
  ) {
    return this.examViewerService.createExamCategoryViewer(
      user,
      createExamCategoryViewerInput,
    );
  }

  @Role(['ANY'])
  @Query(() => GetExamCategoryViewrsOutput)
  async getExamCategoryViewers(
    @Args('input') getExamCategoryViewrsInput: GetExamCategoryViewrsInput,
    @AuthUser() user: User,
  ) {
    return this.examViewerService.getExamCategoryViewers(
      user,
      getExamCategoryViewrsInput,
    );
  }

  @Role(['ANY'])
  @Mutation(() => DeleteExamCategoryViewerOutput)
  async deleteExamCategoryViewer(
    @Args('input') deleteExamCategoryViewerInput: DeleteExamCategoryViewerInput,
    @AuthUser() user: User,
  ) {
    return this.examViewerService.deleteExamCategoryViewer(
      user,
      deleteExamCategoryViewerInput,
    );
  }

  @Role(['ANY'])
  @Mutation(() => UpdateExamViewerArroveStateOutput)
  async updateExamViewerArroveState(
    @AuthUser() user: User,
    @Args('input')
    updateExamViewerArroveStateInput: UpdateExamViewerArroveStateInput,
  ) {
    return this.examViewerService.updateExamViewerArroveState(
      user,
      updateExamViewerArroveStateInput,
    );
  }
}
