import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ReceiptsService } from 'src/receicpts/receipts.service';

@Resolver('Receipt')
export class ReceiptResolver {
  constructor(private readonly receiptsService: ReceiptsService) {}

  @Query('receipts')
  receipts() {
    return this.receiptsService.findAll();
  }

  @Mutation('createReceipt')
  createReceipt(@Args('total') total: number) {
    return this.receiptsService.create({ total } as any); //as any means we are bypassing type checking here, you can replace it with the actual type of the receipt entity if you have it defined.
  }
}
