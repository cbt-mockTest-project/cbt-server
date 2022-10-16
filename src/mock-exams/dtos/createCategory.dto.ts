import { CoreOutput } from './../../common/dtos/output.dto';
import { MockExamCategory } from './../entities/mock-exam-category.entity';
import { InputType, ObjectType, PickType } from '@nestjs/graphql';

@InputType()
export class CreateMockExamCategoryInput extends PickType(MockExamCategory, [
  'name',
]) {}

@ObjectType()
export class CreateMockExamCategoryOutput extends CoreOutput {}
