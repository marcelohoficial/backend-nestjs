import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserEntity } from './user.entity';

type userSchema = {
  name: string;
  email: string;
  password: string;
};

@Injectable()
export class UsersRepository {
  prisma = new PrismaClient();

  async all() {
    return this.prisma.user.findMany();
  }

  async show(email) {
    return this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  async save(user) {
    await this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    return user;
  }

  async update(id, user: Partial<UserEntity>) {
    return await this.prisma.user.update({
      where: { id },
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
  }

  async delete(data) {
    try {
      await this.prisma.user.delete({
        where: { id: data.id },
      });
    } catch {
      return { error: 'User not found!' };
    }

    return { success: 'User as deleted' };
  }

  async emailValidate(email: string) {
    const user = await this.prisma.user.findMany({
      where: {
        email: {
          equals: email,
        },
      },
    });
    // const users = await this.prisma.user.findMany();
    // const userT = await users.find((user) => user.email === email);

    // return user !== undefined;
    return user.length > 0;
  }
}
