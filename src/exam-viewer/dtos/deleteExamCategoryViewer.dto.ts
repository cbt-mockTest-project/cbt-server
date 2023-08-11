import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class DeleteExamCategoryViewerInput {
  @Field(() => Number)
  examViewerId: number;
  @Field(() => Number)
  categoryId: number;
}

@ObjectType()
export class DeleteExamCategoryViewerOutput extends CoreOutput {}
