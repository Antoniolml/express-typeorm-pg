import { IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { BaseDto } from '../../config/base.dto';

export class BrandDTO extends BaseDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsUrl()
  @IsNotEmpty()
  image!: string;
}
