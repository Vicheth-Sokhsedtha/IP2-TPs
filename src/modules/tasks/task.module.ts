import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/modules/tasks/task.entity';
import { TasksController } from 'src/modules/tasks/task.controller';
import { TasksService } from 'src/modules/tasks/task.service';
@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TaskModule {}
