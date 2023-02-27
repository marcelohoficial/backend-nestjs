import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put
} from '@nestjs/common';
import { NestResponse } from 'src/core/http/nest-response';
import { NestResponseBuilder } from '../core/http/nest-response-builder';
import { CreateUserDTO, UpdateUserDTO } from './dto/User.dto';
import { UsersRepository } from './users.repository';

type usuario = {
  name: string;
  email: string;
  password: string;
};

@Controller('/users')
export class UsersController {
  // private usersRepository = new UsersRepository();
  constructor(private usersRepository: UsersRepository) {}

  @Get()
  async listAll() {
    const users = await this.usersRepository.all();

    // return users.map(
    //   (user) => new ListUsersDTO(user.id, user.name, user.email),
    // );
    return users;
  }

  @Get(':email')
  async show(@Param('email') email: string) {
    const user = await this.usersRepository.show(email);

    if (!user)
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'Usuário não encontrado.',
      });

    return user;
  }

  @Post()
  async createUser(@Body() user: CreateUserDTO): Promise<NestResponse> {
    const userCreated = await this.usersRepository.save(user);

    return await new NestResponseBuilder()
      .status(HttpStatus.CREATED)
      .headers({
        Location: `/users/${userCreated.username}`,
      })
      .body(userCreated)
      .build();

    // res
    //   .staus(HttpStatus.CREATED)
    //   .location(`/users/${userCreated.username}`)
    //   .json(userCreated);
    // return userCreated
  }

  @Put('/:id')
  async updateUser(@Param('id') id: number, @Body() user: UpdateUserDTO) {
    return await this.usersRepository.update(id, user);
  }

  @Delete()
  async deleteUser(@Body() id) {
    return await this.usersRepository.delete(id);
  }
}
