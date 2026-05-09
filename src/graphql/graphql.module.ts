import { Module } from '@nestjs/common';

import { CategoriesModule } from '../categories/categories.module';
import { ProductsModule } from '../products/products.module';

import { CategoryResolver } from './resolvers/category.resolver';
import { ProductResolver } from './resolvers/product.resolver';

@Module({
  imports: [CategoriesModule, ProductsModule],
  providers: [CategoryResolver, ProductResolver],
})
export class GraphqlModule {}
