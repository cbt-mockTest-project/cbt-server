import { CoreOutput } from '../../common/dtos/output.dto';
import { MockExamCategory } from '../entities/mock-exam-category.entity';
import { InputType, ObjectType, PickType } from '@nestjs/graphql';

@InputType()
export class EditMockExamCategoryInput extends PickType(MockExamCategory, [
  'id',
  'name',
]) {}

@ObjectType()
export class EditMockExamCategoryOutput extends CoreOutput {}
