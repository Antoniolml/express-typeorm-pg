import { IsNotEmpty } from 'class-validator';
import { BaseDto } from '../../config/base.dto';
import { CustomerEntity } from '../entities/customer.entity';

export class OrderDTO extends BaseDto {
  @IsNotEmpty()
  customerId!: CustomerEntity;

  @IsNotEmpty()
  status!: string;

  @IsNotEmpty()
  paymentMethod!: string;
}
