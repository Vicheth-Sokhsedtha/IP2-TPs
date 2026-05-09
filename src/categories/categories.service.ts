import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../database/entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  findAll() {
    return this.categoryRepository.find();
  }

  findOne(id: number) {
    return this.categoryRepository.findOne({
      where: { id },
    });
  }

  create(data: Partial<Category>) {
    const category = this.categoryRepository.create(data);
    return this.categoryRepository.save(category);
  }
}