import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  deleteTask(_id: number) {
    throw new Error('Method not implemented.');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateTask(_id: number, _updateData: Partial<Task>) {
    throw new Error('Method not implemented.');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getTask(_id: number) {
    throw new Error('Method not implemented.');
  }
  createTask(taskData: CreateTaskDto) {
    const task = this.tasksRepo.create(taskData);
    return this.tasksRepo.save(task);
  }
  constructor(
    @InjectRepository(Task)
    private tasksRepo: Repository<Task>,
  ) {}

  create(taskData: Partial<Task>) {
    const task = this.tasksRepo.create(taskData);
    return this.tasksRepo.save(task);
  }

  findAll() {
    return this.tasksRepo.find({ relations: ['user'] });
  }

  findOne(id: number) {
    return this.tasksRepo.findOne({ where: { id }, relations: ['user'] });
  }

  async update(id: number, updateData: Partial<Task>) {
    await this.tasksRepo.update(id, updateData);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.tasksRepo.delete(id);
  }
}
