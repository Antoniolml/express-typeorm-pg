import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';
import { BaseDto } from '../../config/base.entity';
import { CustomerEntity } from '../../customers/entities/customer.entity';

export class UserDTO extends BaseDto {
  @IsString()
  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @Length(18)
  password!: string;

  @IsString()
  role!: string;

  @IsOptional()
  @IsPositive()
  customer!: CustomerEntity;
}
