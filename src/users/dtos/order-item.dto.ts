import { IsNotEmpty, IsPositive } from 'class-validator';
import { BaseDto } from '../../config/base.dto';

export class OrderItemDTO extends BaseDto {
  @IsNotEmpty()
  @IsPositive()
  orderId!: string;

  @IsNotEmpty()
  @IsPositive()
  productId!: string;

  @IsNotEmpty()
  @IsPositive()
  quantity!: number;
}
