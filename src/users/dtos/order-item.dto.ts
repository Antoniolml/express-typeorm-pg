import { IsNotEmpty, IsOptional, IsPositive } from 'class-validator';
import { BaseDto } from '../../config/base.dto';
import { ProductEntity } from '../../products/entities/product.entity';
import { OrderEntity } from '../entities/order.entity';

export class OrderItemDTO extends BaseDto {
  @IsNotEmpty()
  @IsPositive()
  quantity!: number;

  @IsOptional()
  totalPrice?: number;

  @IsOptional()
  productId?: ProductEntity;

  @IsOptional()
  orderId?: OrderEntity;
}
