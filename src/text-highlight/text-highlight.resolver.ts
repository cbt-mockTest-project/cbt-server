import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { TextHighlight } from './entites/text-highlight.entity';
import { TextHighlightService } from './text-highlight.service';
import {
  InsertTextHighlightInput,
  InsertTextHighlightOutput,
} from './dtos/insert-text-highlight.dto';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { User } from 'src/users/entities/user.entity';
import {
  DeleteTextHighlightInput,
  DeleteTextHighlightOutput,
} from './dtos/delete-text-highlight.dto';
import {
  DeleteTextHighlightsInput,
  DeleteTextHighlightsOutput,
} from './dtos/delete-text-highlights.dto';

@Resolver(() => TextHighlight)
export class TextHighlightResolver {
  constructor(private readonly textHighlightService: TextHighlightService) {}

  @Mutation(() => InsertTextHighlightOutput)
  async insertTextHighlight(
    @Args('input') insertTextHighlightInput: InsertTextHighlightInput,
    @AuthUser() user: User,
  ): Promise<InsertTextHighlightOutput> {
    return this.textHighlightService.insertTextHighlight(
      insertTextHighlightInput,
      user,
    );
  }

  @Mutation(() => DeleteTextHighlightOutput)
  async deleteTextHighlight(
    @Args('input') deleteTextHighlightInput: DeleteTextHighlightInput,
    @AuthUser() user: User,
  ): Promise<DeleteTextHighlightOutput> {
    return this.textHighlightService.deleteTextHighlight(
      deleteTextHighlightInput,
      user,
    );
  }

  @Mutation(() => DeleteTextHighlightsOutput)
  async deleteTextHighlights(
    @Args('input') deleteTextHighlightsInput: DeleteTextHighlightsInput,
    @AuthUser() user: User,
  ): Promise<DeleteTextHighlightsOutput> {
    return this.textHighlightService.deleteTextHighlights(
      deleteTextHighlightsInput,
      user,
    );
  }
}
