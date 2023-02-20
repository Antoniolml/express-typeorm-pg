import { IsArray, IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { BaseDto } from '../../config/base.entity';
import { ProductEntity } from '../../products/entities/product.entity';

export class BrandDTO extends BaseDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsUrl()
  @IsNotEmpty()
  image!: string;
}
