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

import { ReceiptsService } from './receipts.service';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';
import { ApiKeyGuard } from 'src/common/guards/api-key.quard';

@UseGuards(ApiKeyGuard)
@Controller('receipts')
export class ReceiptsController {
  constructor(private readonly receiptsService: ReceiptsService) {}

  // GET /receipts
  @Get()
  findAll() {
    return this.receiptsService.findAll();
  }

  // GET /receipts/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.receiptsService.findOne(id);
  }

  // POST /receipts
  @Post()
  create(@Body() dto: CreateReceiptDto) {
    return this.receiptsService.create(dto);
  }

  // PATCH /receipts/:id
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateReceiptDto,
  ) {
    return this.receiptsService.update(id, dto);
  }

  // DELETE /receipts/:id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.receiptsService.remove(id);
  }
}