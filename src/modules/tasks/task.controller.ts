import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ParseIntPipe,
} from '@nestjs/common';
import { TasksService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get('/:id')
  getTask(@Param('id', ParseIntPipe) id: number) {
    // <-- convert to number
    return this.taskService.getTask(id);
  }

  @Post('/')
  createTask(@Body() body: CreateTaskDto) {
    return this.taskService.createTask(body);
  }

  @Patch('/:id/done')
  markTaskAsDone(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    // <-- convert
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.taskService.updateTask(id, body);
  }

  @Patch('/:id/pending')
  markTaskAsPending(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    // <-- convert
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.taskService.updateTask(id, body);
  }

  @Delete('/:id')
  deleteTask(@Param('id', ParseIntPipe) id: number) {
    // <-- convert
    return this.taskService.deleteTask(id);
  }
}
