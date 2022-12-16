import { CoreOutput } from 'src/common/dtos/output.dto';
import { User } from 'src/users/entities/user.entity';
import { InputType, ObjectType, PickType } from '@nestjs/graphql';

@InputType()
export class CheckPasswordInput extends PickType(User, ['password']) {}

@ObjectType()
export class CheckPasswordOutput extends CoreOutput {}
