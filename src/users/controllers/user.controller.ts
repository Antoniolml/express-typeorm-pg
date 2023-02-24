import { Request, Response } from 'express';
import { DeleteResult, UpdateResult } from 'typeorm';
import { HttpResponse } from '../../shared/response/http.response';
import { UserService } from '../services/user.service';

export class userController {
  constructor(
    private readonly userService: UserService = new UserService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async GetUsers(_req: Request, res: Response) {
    try {
      const Users = await this.userService.findAllUsers();
      if (!Users.length) {
        return this.httpResponse.NoContent(res);
      }
      return this.httpResponse.OK(res, Users);
    } catch (error) {
      console.log(error);
      return this.httpResponse.InternalServerError(res, error);
    }
  }

  async GetUserById(_req: Request, res: Response) {
    const { id } = _req.params;
    try {
      const User = await this.userService.findUserById(id);
      if (!User) {
        return this.httpResponse.NotFound(res, {
          message: 'User not found',
        });
      }
      return this.httpResponse.OK(res, User);
    } catch (error) {
      console.log(error);
      return this.httpResponse.InternalServerError(res, error);
    }
  }

  async CreateUser(_req: Request, res: Response) {
    try {
      const newUser = await this.userService.createUser(_req.body);
      return this.httpResponse.Created(res, newUser);
    } catch (error) {
      console.log(error);
      return this.httpResponse.InternalServerError(res, error);
    }
  }

  async UpdateUser(_req: Request, res: Response) {
    const { id } = _req.params;
    try {
      const User: UpdateResult = await this.userService.updateUser(
        id,
        _req.body
      );
      if (!User.affected) {
        return this.httpResponse.NotFound(res, {
          message: 'There is an error updating',
        });
      }
      return this.httpResponse.OK(res, User);
    } catch (error) {
      console.log(error);
      return this.httpResponse.InternalServerError(res, error);
    }
  }

  async DeleteUser(_req: Request, res: Response) {
    const { id } = _req.params;
    try {
      const User: DeleteResult = await this.userService.deleteUser(id);
      if (!User.affected) {
        return this.httpResponse.NotFound(res, {
          message: 'There is an error deleting',
        });
      }
      return this.httpResponse.OK(res, User);
    } catch (error) {
      console.log(error);
      return this.httpResponse.InternalServerError(res, error);
    }
  }
}
