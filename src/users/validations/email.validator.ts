import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';
import { UsersRepository } from '../users.repository';

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailValidator implements ValidatorConstraintInterface {
  constructor(private usersRepository: UsersRepository) {}

  async validate(value: any): Promise<boolean> {
    const email = await this.usersRepository.emailValidate(value);

    return !email;
  }
}

export const IsUniqueEmail = (optionsValidators: ValidationOptions) => {
  return (objeto: object, props: string) => {
    registerDecorator({
      target: objeto.constructor,
      propertyName: props,
      options: optionsValidators,
      constraints: [],
      validator: EmailValidator,
    });
  };
};
