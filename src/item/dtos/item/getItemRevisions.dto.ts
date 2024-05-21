import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import {
  ItemRevision,
  ItemRevisionStateEnum,
} from 'src/item/entities/item-revision.entity';

@InputType()
export class GetItemRevisionsInput {
  @Field(() => [ItemRevisionStateEnum], { nullable: true })
  states?: ItemRevisionStateEnum[];
}

@ObjectType()
export class GetItemRevisionsOutput extends CoreOutput {
  @Field(() => [ItemRevision], { nullable: true })
  itemRevisions?: ItemRevision[];
}
