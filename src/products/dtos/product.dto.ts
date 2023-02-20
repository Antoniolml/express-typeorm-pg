import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';
import { BrandEntity } from '../../Brands/entities/brand.entity';
import { CategoryEntity } from '../../categories/entities/category.entity';
import { BaseDto } from '../../config/base.entity';

export class PrdocutDTO extends BaseDto {
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
