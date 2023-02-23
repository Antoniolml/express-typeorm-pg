import { Request, Response } from 'express';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UserService } from '../services/user.service';

export class userController {
  constructor(private readonly userService: UserService = new UserService()) {}

  async GetUsers(_req: Request, res: Response) {
    try {
      const Users = await this.userService.findAllUsers();
      res.status(200).json(Users);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async GetUserById(_req: Request, res: Response) {
    const { id } = _req.params;
    try {
      const User = await this.userService.findUserById(id);
      if (!User) {
        res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(User);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async CreateUser(_req: Request, res: Response) {
    try {
      const newUser = await this.userService.createUser(_req.body);
      res.status(201).json(newUser);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
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
        res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User updated' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async DeleteUser(_req: Request, res: Response) {
    const { id } = _req.params;
    try {
      const User: DeleteResult = await this.userService.deleteUser(id);
      if (!User.affected) {
        res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
