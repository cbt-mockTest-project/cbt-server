import { InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class DeleteTextHighlightInput {}

@ObjectType()
export class DeleteTextHighlightOutput extends CoreOutput {}
