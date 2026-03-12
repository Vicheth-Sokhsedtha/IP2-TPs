import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/users/user.entity';
import { Task } from './modules/tasks/task.entity';
import { UsersModule } from './modules/users/user.module';
import { TaskModule } from 'src/modules/tasks/task.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'todo.sqlite',
      entities: [User, Task],
      synchronize: true,
    }),
    UsersModule,
    TaskModule,
  ],
})
export class AppModule {}
