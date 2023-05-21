import { InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class CreateFreeTrialRoleInput {}

@ObjectType()
export class CreateFreeTrialRoleOutput extends CoreOutput {}
