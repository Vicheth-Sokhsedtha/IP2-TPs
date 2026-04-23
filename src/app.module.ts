import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { Receipt } from './database/entities/receipts.entity';
import { ReceiptsModule } from './receicpts/receipts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsModule } from './notifications/notifications.module';
import { OrdersModule } from './orders/orders.module';
import { CoreModule } from './core/core.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: 3306,
      username: 'root',
      password: '123',
      database: 'receipts_db',
      autoLoadEntities: true, // Automatically load entities from the project
      synchronize: true, //auto create tables based on entities, not recommended for production
    }),
    ReceiptsModule,
    NotificationsModule,
    OrdersModule,
    CoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
