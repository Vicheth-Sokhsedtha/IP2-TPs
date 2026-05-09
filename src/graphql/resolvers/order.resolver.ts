import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

import { OrdersService } from '../../orders/orders.service';
import { ReceiptsService } from 'src/receicpts/receipts.service';

@Resolver('Order')
export class OrderResolver {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly receiptsService: ReceiptsService,
  ) {}

  @Query('orders')
  orders() {
    return this.ordersService.findAll();
  }

  @Query('order')
  order(@Args('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Mutation('createOrder')
  createOrder(
    @Args('itemName') itemName: string,
    @Args('price') price: number,
    @Args('receiptId') receiptId: string,
  ) {
    return this.ordersService.create({
      name: itemName,
      price,
      receiptId: Number(receiptId),
    } as any);
  }

  // ⭐ RELATION FIELD (very important for lab)
  @ResolveField('receipt')
  receipt(@Parent() order: { receiptId: string | number }) {
    return this.receiptsService.findOne(String(order.receiptId));
  }
}
