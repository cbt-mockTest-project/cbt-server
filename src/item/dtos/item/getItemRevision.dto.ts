import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { ItemRevision } from '../../entities/item-revision.entity';

@InputType()
export class GetItemRevisionInput {
  @Field(() => Number)
  id: number;
}

@ObjectType()
export class GetItemRevisionOutput extends CoreOutput {
  @Field(() => ItemRevision, { nullable: true })
  itemRevision?: ItemRevision;
}
