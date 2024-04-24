import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class CreateSecederInput {
  @Field((type) => String)
  email: string;
}

@ObjectType()
export class CreateSecederOutput extends CoreOutput {}
