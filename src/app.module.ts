import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReceiptsModule } from './receicpts/receipts.module';
import { NotificationsModule } from './notifications/notifications.module';
import { OrdersModule } from './orders/orders.module';
import { CoreModule } from './core/core.module';
import { GraphqlModule } from './graphql/graphql.module';

import { TypeOrmModule } from '@nestjs/typeorm';

// ⭐ ADD GRAPHQL IMPORTS
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    // 🗄️ Database
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: 3306,
      username: 'root',
      password: '123',
      database: 'receipts_db',
      autoLoadEntities: true,
      synchronize: true,
    }),

    // ⭐ GRAPHQL ENGINE (this was missing!)
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: [join(process.cwd(), 'src/graphql/schema/*.graphql')],
    }),

    // existing modules
    ReceiptsModule,
    NotificationsModule,
    OrdersModule,
    CoreModule,

    // ⭐ GraphQL resolvers module
    GraphqlModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
