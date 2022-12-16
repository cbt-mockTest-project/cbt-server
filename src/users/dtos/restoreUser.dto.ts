import { User } from 'src/users/entities/user.entity';
import { InputType, PickType } from '@nestjs/graphql';
@InputType()
export class RestoreUserInput extends PickType(User, ['id']) {}
