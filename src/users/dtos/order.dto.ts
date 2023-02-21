import { IsNotEmpty, IsPositive } from 'class-validator';
import { BaseDto } from '../../config/base.dto';

export class OrderDTO extends BaseDto {
  @IsPositive()
  @IsNotEmpty()
  customerId!: string;
}
