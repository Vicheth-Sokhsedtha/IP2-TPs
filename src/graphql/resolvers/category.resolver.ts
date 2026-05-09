import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CategoriesService } from '../../categories/categories.service';

@Resolver('Category')
export class CategoryResolver {
  constructor(
    private readonly categoriesService: CategoriesService,
  ) {}

  @Query('categories')
  categories() {
    return this.categoriesService.findAll();
  }

  @Mutation('createCategory')
  createCategory(@Args('name') name: string) {
    return this.categoriesService.create({ name });
  }
}