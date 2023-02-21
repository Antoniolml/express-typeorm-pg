import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { BaseDto } from '../../config/base.dto';

export class CustomerDTO extends BaseDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  phone!: string;

  user!: string;
  order!: string;
}
