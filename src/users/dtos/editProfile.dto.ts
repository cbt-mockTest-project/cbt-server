import { CoreOutput } from 'src/common/dtos/output.dto';
import { User } from 'src/users/entities/user.entity';
import { InputType, ObjectType, PartialType, PickType } from '@nestjs/graphql';

@InputType()
export class EditProfileInput extends PickType(PartialType(User), [
  'nickname',
  'password',
  'profileImg',
  'hasBookmarkedBefore',
  'hasSolvedBefore',
  'hasReachedPaymentReminder',
  'randomExamLimit',
]) {}

@ObjectType()
export class EditProfileOutput extends CoreOutput {}
