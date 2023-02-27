import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { EmailValidator } from './validations/email.validator';

@Module({
  controllers: [UsersController],
  providers: [UsersRepository, EmailValidator],
})
export class UsersModule {}
