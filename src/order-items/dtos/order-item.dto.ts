import { IsNotEmpty, IsPositive } from 'class-validator';
import { BaseDto } from '../../config/base.entity';

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
