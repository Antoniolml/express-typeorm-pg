import { IsNotEmpty, IsString } from 'class-validator';
import { BaseDto } from '../../config/base.dto';

export class CategoryDTO extends BaseDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
}
