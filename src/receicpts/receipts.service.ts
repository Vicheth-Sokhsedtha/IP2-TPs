import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Receipt } from 'src/database/entities/receipts.entity';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';
import { NotificationsService } from 'src/notifications/notifications.service';

@Injectable()
export class ReceiptsService {
  constructor(
    @InjectRepository(Receipt)
    private readonly receiptRepo: Repository<Receipt>,
    private readonly notifications: NotificationsService,
  ) {}

  // GET /receipts
  async findAll() {
    return this.receiptRepo.find({
      order: { issuedAt: 'DESC' },
    });
  }

  // GET /receipts/:id
  async findOne(id: string) {
    const receiptId = Number(id); // ⭐ convert to number

    const receipt = await this.receiptRepo.findOne({
      where: { receiptId },
    });

    if (!receipt) {
      throw new NotFoundException(`Receipt with ID ${id} not found`);
    }

    return receipt;
  }

  // POST /receipts
  async create(dto: CreateReceiptDto) {
    const receipt = this.receiptRepo.create({
      name: dto.name,
      price: dto.price,
      issuedAt: dto.issuedAt ? new Date(dto.issuedAt) : new Date(),
    });

    const saved = await this.receiptRepo.save(receipt);

    // 🔔 notification
    this.notifications.notify('receipt_created', {
      receiptId: saved.receiptId,
      price: saved.price,
    });

    return saved;
  }

  // PATCH /receipts/:id
  async update(id: string, dto: UpdateReceiptDto) {
    const receipt = await this.findOne(id); // already converts inside

    if (dto.issuedAt !== undefined) {
      receipt.issuedAt = new Date(dto.issuedAt);
    }

    if (dto.name !== undefined) {
      receipt.name = dto.name;
    }

    if (dto.price !== undefined) {
      receipt.price = dto.price;
    }

    const updated = await this.receiptRepo.save(receipt);

    // 🔔 notification
    this.notifications.notify('receipt_updated', {
      receiptId: updated.receiptId,
      price: updated.price,
    });

    return updated;
  }

  // DELETE /receipts/:id
  async remove(id: string) {
    const receipt = await this.findOne(id);

    await this.receiptRepo.remove(receipt);

    // 🔔 notification
    this.notifications.notify('receipt_deleted', {
      receiptId: Number(id), // ⭐ convert
    });

    return {
      deleted: true,
      receiptId: Number(id),
    };
  }
}