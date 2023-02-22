import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { BaseDto } from '../../config/base.dto';
import { OrderEntity } from '../entities/order.entity';
import { UserEntity } from '../entities/user.entity';

export class CustomerDTO extends BaseDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  phone!: string;

  @IsString()
  @IsNotEmpty()
  user!: UserEntity;

  @IsString()
  @IsNotEmpty()
  order!: OrderEntity;
}
