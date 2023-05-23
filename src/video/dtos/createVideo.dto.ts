import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Video } from '../entities/video.entity';

@InputType()
export class CreateVideoInput extends PickType(Video, ['size', 'url']) {}

@ObjectType()
export class CreateVideoOutput extends CoreOutput {}
