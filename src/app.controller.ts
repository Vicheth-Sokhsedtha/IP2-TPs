import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './modules/users/users.service';
import { TasksService } from './modules/tasks/task.service';
import { createUserDto } from './modules/users/dto/create-user.dto';
import { CreateTaskDto } from './modules/tasks/dto/create-task.dto';

@Controller()
export class AppController {
  constructor(
    private readonly usersService: UsersService,
    private readonly tasksService: TasksService,
  ) {}

  // ================= USERS =================
  @Post('users')
  createUser(@Body() body: createUserDto) {
    return this.usersService.createUser(body);
  }

  @Get('users/:id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Put('users/:id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return this.usersService.update(id, body);
  }

  @Delete('users/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }

  // ================= TASKS =================
  @Post('tasks')
  createTask(@Body() body: CreateTaskDto) {
    return this.tasksService.createTask(body);
  }

  @Get('tasks/:id')
  getTask(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.getTask(id);
  }

  @Put('tasks/:id')
  updateTask(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return this.tasksService.updateTask(id, body);
  }

  @Delete('tasks/:id')
  deleteTask(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.deleteTask(id);
  }
}
