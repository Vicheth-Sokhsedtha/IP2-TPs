import { forwardRef, Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
// import { OrdersModule } from 'src/orders/orders.module';
import { CoreModule } from 'src/core/core.module';
// import { Receipt } from 'src/database/entities/receipts.entity';
import { ReceiptsModule } from 'src/receicpts/receipts.module';

@Module({
  providers: [NotificationsService],
  exports: [NotificationsService], // Export the service to be used in other modules
})
// @Module({
//   imports: [OrdersModule],
//   providers: [NotificationsService],
//   exports: [NotificationsService],
// })
@Module({
  // imports: [CoreModule, ReceiptsModule],
  imports: [
    forwardRef(() => CoreModule), // Use forwardRef to avoid circular dependency
    forwardRef(() => ReceiptsModule), // Use forwardRef to avoid circular dependency
  ],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
