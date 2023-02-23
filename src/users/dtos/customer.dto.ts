import { IsNotEmpty, IsString } from 'class-validator';
import { BaseDto } from '../../config/base.dto';
import { UserEntity } from '../entities/user.entity';

export class CustomerDTO extends BaseDto {
  @IsNotEmpty()
  address!: string;

  @IsNotEmpty()
  dni!: number;

  @IsString()
  @IsNotEmpty()
  user!: UserEntity;
}
