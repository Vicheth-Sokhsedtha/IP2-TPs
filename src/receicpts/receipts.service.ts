import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Receipt } from 'src/database/entities/receipts.entity';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';

@Injectable()
export class ReceiptsService {
  constructor(
    @InjectRepository(Receipt)
    private readonly receiptRepo: Repository<Receipt>,
  ) {}

  async findAll() {
    // Shows newest receipts first
    return this.receiptRepo.find({
      order: { issuedAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    // CRITICAL: Changed 'receiptId' to 'id' to match standard entities.
    // If your entity specifically uses @Column() receiptId, change 'id' back to 'receiptId'.
    const receipt = await this.receiptRepo.findOne({
      where: { id: id } as any,
    });

    if (!receipt) {
      throw new NotFoundException(`Receipt with ID ${id} not found`);
    }
    return receipt;
  }

  async create(dto: CreateReceiptDto) {
    const receipt = this.receiptRepo.create({
      name: dto.name,
      price: dto.price,
      // If dto.issuedAt is "2026-03-26", this creates a valid Date object
      issuedAt: dto.issuedAt ? new Date(dto.issuedAt) : new Date(),
    });
    return this.receiptRepo.save(receipt);
  }

  async update(id: string, dto: UpdateReceiptDto) {
    const receipt = await this.findOne(id);

    // Only update fields that are provided in the Request Body
    if (dto.name) receipt.name = dto.name;
    if (dto.price !== undefined) receipt.price = dto.price;
    if (dto.issuedAt) receipt.issuedAt = new Date(dto.issuedAt);

    return this.receiptRepo.save(receipt);
  }

  async remove(id: string) {
    const receipt = await this.findOne(id);
    await this.receiptRepo.remove(receipt);

    return {
      message: `Receipt with ID ${id} deleted successfully`,
      deletedId: id,
    };
  }
}
