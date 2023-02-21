import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';
import { BrandEntity } from '../entities/brand.entity';
import { CategoryEntity } from '../entities/category.entity';
import { BaseDto } from '../../config/base.dto';

export class ProductDTO extends BaseDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  price!: number;

  @IsNumber()
  @IsNotEmpty()
  stock!: number;

  @IsUrl()
  @IsNotEmpty()
  image!: string;

  @IsNotEmpty()
  brand!: BrandEntity;

  @IsArray()
  @IsNotEmpty()
  categories!: CategoryEntity[];
}
