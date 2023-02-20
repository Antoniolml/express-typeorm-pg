import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { BaseDto } from '../../config/base.entity';
import { ProductEntity } from '../../products/entities/product.entity';

export class CategoryDTO extends BaseDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
}
