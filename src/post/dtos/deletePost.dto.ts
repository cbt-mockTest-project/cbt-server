import { CoreOutput } from '../../common/dtos/output.dto';
import { Post } from '../entities/post.entity';
import { InputType, ObjectType, PickType } from '@nestjs/graphql';

@InputType()
export class DeletePostInput extends PickType(Post, ['id']) {}

@ObjectType()
export class DeletePostOutput extends CoreOutput {}
