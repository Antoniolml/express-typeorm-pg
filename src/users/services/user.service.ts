import { DeleteResult, UpdateResult } from 'typeorm';
import { BaseService } from '../../config/base.service';
import { CustomerDTO } from '../dtos/customer.dto';

import * as bcrypt from 'bcrypt';

import { UserEntity } from '../entities/user.entity';
import { RoleType } from '../dtos/user.dto';

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

  async findUserWithRole(
    id: string,
    role: RoleType
  ): Promise<UserEntity | null> {
    const user = (await this.execRepository)
      .createQueryBuilder('user')
      .where({ id })
      .andWhere({ role })
      .getOne();

    return user;
  }

  async findUserByEmail(email: string): Promise<UserEntity | null> {
    return (await this.execRepository)
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where({ email })
      .getOne();
  }

  async findUserByUsername(username: string): Promise<UserEntity | null> {
    return (await this.execRepository)
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where({ username })
      .getOne();
  }

  async createUser(body: CustomerDTO): Promise<UserEntity> {
    const newUser = (await this.execRepository).create(body);
    const hash = await bcrypt.hash(newUser.password, 10);
    newUser.password = hash;
    return (await this.execRepository).save(newUser);
  }

  async updateUser(id: string, infoUpdate: CustomerDTO): Promise<UpdateResult> {
    return (await this.execRepository).update(id, infoUpdate);
  }

  async deleteUser(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete(id);
  }
}
