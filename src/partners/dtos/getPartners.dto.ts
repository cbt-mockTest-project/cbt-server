import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Partner } from '../entities/partners.entity';

@InputType()
export class GetPartnersInput {}

@ObjectType()
export class GetPartnersOutput extends CoreOutput {
  @Field(() => [Partner], { nullable: true })
  partners?: Partner[];
}
