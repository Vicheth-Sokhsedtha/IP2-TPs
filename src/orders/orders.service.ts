import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../database/entities/orders.entity';
import { NotificationsService } from 'src/notifications/notifications.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    private readonly notifications: NotificationsService,
  ) {}

  async findAll() {
    return this.orderRepo.find({ order: { issuedAt: 'DESC' } });
  }

  async findOne(id: string) {
    const orderId = Number(id);
    const order = await this.orderRepo.findOne({ where: { orderId } });
    if (!order) throw new NotFoundException(`Order with ID ${id} not found`);
    return order;
  }

  async create(dto: CreateOrderDto) {
    const order = this.orderRepo.create({
      name: dto.name,
      price: dto.price,
      quantity: dto.quantity,
      issuedAt: dto.issuedAt ? new Date(dto.issuedAt) : new Date(),
    });

    const saved = await this.orderRepo.save(order);

    this.notifications.notify('order_created', {
      orderId: saved.orderId,
      price: saved.price,
    });

    return saved;
  }

  async update(id: string, dto: UpdateOrderDto) {
    const order = await this.findOne(id);

    if (dto.issuedAt !== undefined) order.issuedAt = new Date(dto.issuedAt);
    if (dto.name !== undefined) order.name = dto.name;
    if (dto.price !== undefined) order.price = dto.price;
    if (dto.quantity !== undefined) order.quantity = dto.quantity;

    const updated = await this.orderRepo.save(order);

    this.notifications.notify('order_updated', {
      orderId: updated.orderId,
      price: updated.price,
    });

    return updated;
  }

  async remove(id: string) {
    const order = await this.findOne(id);
    await this.orderRepo.remove(order);

    this.notifications.notify('order_deleted', { orderId: Number(id) });

    return { deleted: true, orderId: Number(id) };
  }
}