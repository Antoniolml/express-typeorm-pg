import { IsNotEmpty, IsPositive } from 'class-validator';
import { BaseDto } from '../../config/base.entity';

export class OrderDTO extends BaseDto {
  @IsPositive()
  @IsNotEmpty()
  customerId!: string;
}
