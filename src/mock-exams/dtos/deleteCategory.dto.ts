import { CoreOutput } from './../../common/dtos/output.dto';
import { MockExamCategory } from './../entities/mock-exam-category.entity';
import { InputType, ObjectType, PickType } from '@nestjs/graphql';

@InputType()
export class DeleteMockExamCategoryInput extends PickType(MockExamCategory, [
  'id',
]) {}

@ObjectType()
export class DeleteMockExamCategoryOutput extends CoreOutput {}
