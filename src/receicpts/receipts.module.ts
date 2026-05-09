import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Receipt } from 'src/database/entities/receipts.entity';
import { ReceiptsService } from './receipts.service';
import { ReceiptsController } from './receipts.controller';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  imports: [TypeOrmModule.forFeature([Receipt]), NotificationsModule],
  controllers: [ReceiptsController],
  providers: [ReceiptsService],
  exports: [ReceiptsService], // Export the service to be used in other modules
})
export class ReceiptsModule {}
