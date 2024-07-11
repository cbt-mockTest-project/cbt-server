import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { MockExamQuestionBookmarkFolder } from 'src/exam/entities/mock-exam-question-bookmark-folder.entity';

@InputType()
export class CreateQuestionBookmarkFolderInput extends PickType(
  MockExamQuestionBookmarkFolder,
  ['name'],
) {}

@ObjectType()
export class CreateQuestionBookmarkFolderOutput extends CoreOutput {}
