import { DeleteResult, UpdateResult } from 'typeorm';
import { BaseService } from '../../config/base.service';
import { CustomerDTO } from '../dtos/customer.dto';

import { OrderEntity } from '../entities/order.entity';
import { UserEntity } from '../entities/user.entity';

export class UserService extends BaseService<UserEntity> {
  constructor() {
    super(UserEntity);
  }

  async findAllUsers(): Promise<UserEntity[]> {
    return (await this.execRepository).find();
  }

  async findUserById(id: string): Promise<UserEntity | null> {
    return (await this.execRepository).findOneBy({ id });
  }

  async createUser(body: CustomerDTO): Promise<UserEntity> {
    const newProduct = (await this.execRepository).create(body);
    return (await this.execRepository).save(newProduct);
  }

  async updateUser(id: string, infoUpdate: CustomerDTO): Promise<UpdateResult> {
    return (await this.execRepository).update(id, infoUpdate);
  }

  async deleteUser(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete(id);
  }
}
