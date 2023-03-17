import { CoreOutput } from './../../common/dtos/output.dto';
import { MockExamCategory } from './../entities/mock-exam-category.entity';
import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';

@InputType()
export class CreateMockExamCategoryInput extends PickType(MockExamCategory, [
  'name',
]) {}

@ObjectType()
export class CreateMockExamCategoryOutput extends CoreOutput {
  @Field(() => MockExamCategory, { nullable: true })
  category?: MockExamCategory;
}
