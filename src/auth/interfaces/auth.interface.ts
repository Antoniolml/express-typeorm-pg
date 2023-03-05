import { RoleType } from '../../users/dtos/user.dto';

export interface PayloadToken {
  role: RoleType;
  sub: string;
}
