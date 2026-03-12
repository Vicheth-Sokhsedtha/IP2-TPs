// src/modules/tasks/dto/create-task.dto.ts
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsDateString,
} from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  completedAt?: Date;

  @IsNotEmpty()
  @IsNumber()
  id: number; // link to existing user
}
