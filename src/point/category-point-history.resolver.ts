import { Resolver } from '@nestjs/graphql';
import { CategoryPointHistory } from './entities/category-point-history.entity';
import { CategoryPointHistoryService } from './category-point-history.service';

@Resolver(() => CategoryPointHistory)
export class CategoryPointHistoryResolver {
  constructor(
    private readonly categoryPointHistoryService: CategoryPointHistoryService,
  ) {}
}
