import { InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { RecentlyStudiedExams } from '../entities/user.entity';

@InputType()
export class UpsertRecentlyStudiedExamsInput extends RecentlyStudiedExams {}

@ObjectType()
export class UpsertRecentlyStudiedExamsOutput extends CoreOutput {}
