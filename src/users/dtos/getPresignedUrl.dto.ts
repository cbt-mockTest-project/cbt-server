import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class GetPresignedUrlInput {
  @Field(() => String)
  path: string;
}

@ObjectType()
export class GetPresignedUrlOutput extends CoreOutput {
  @Field(() => String, { nullable: true })
  presignedUrl?: string;
  @Field(() => String, { nullable: true })
  fileUrl?: string;
}
