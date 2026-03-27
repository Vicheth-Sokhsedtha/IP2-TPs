import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { Receipt } from './database/entities/receipts.entity';
import { ReceiptsModule } from './receicpts/receipts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
