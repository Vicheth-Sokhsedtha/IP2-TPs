import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiKeyGuard } from 'src/common/guards/api-key.quard';
import { OrdersService } from './orders.service';
import { UpdateOrderDto } from './dto/update-order.dto';

@UseGuards(ApiKeyGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // GET /orders
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  // GET /orders/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  // POST /orders
  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.ordersService.create(dto);
  }

  // PATCH /orders/:id
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateOrderDto) {
    return this.ordersService.update(id, dto);
  }

  // DELETE /orders/:id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }
}
