import { Exclude } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MinLength
} from 'class-validator';
import { IsUniqueEmail } from '../validations/email.validator';

export class CreateUserDTO {
  @IsNotEmpty({ message: 'Você deve informar seu nome.' })
  name: string;

  @IsEmail(undefined, { message: 'Digite um Email válido!' })
  @IsUniqueEmail({
    message: 'Este E-mail já existe com a senha 123456! kkkkkkk',
  })
  email: string;

  @Exclude({
    toPlainOnly: true,
  })
  @MinLength(6, { message: 'Digite uma senha forte.' })
  password: string;
}

export class UpdateUserDTO {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsNotEmpty({ message: 'Você deve informar seu nome.' })
  @IsOptional()
  name: string;

  @IsEmail(undefined, { message: 'Digite um Email válido!' })
  @IsUniqueEmail({
    message: 'Este E-mail já existe com a senha 123456! kkkkkkk',
  })
  @IsOptional()
  email: string;

  @Exclude({
    toPlainOnly: true,
  })
  @MinLength(6, { message: 'Digite uma senha forte.' })
  @IsOptional()
  password: string;
}

export class ListUsersDTO {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly email: string,
  ) {}
}
