import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
// import { OrdersModule } from 'src/orders/orders.module';
import { CoreModule } from 'src/core/core.module';

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
  imports: [CoreModule],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
