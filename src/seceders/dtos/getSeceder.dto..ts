import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Seceders } from '../entities/seceders.entity';

@InputType()
export class GetSecederInput {
  @Field((type) => String)
  email: string;
}

@ObjectType()
export class GetSecederOutput extends CoreOutput {
  @Field(() => Seceders, { nullable: true })
  seceder?: Seceders;
}
