import { BaseRouter } from '../shared/router/router';
import { userController } from './controllers/user.controller';
import { UserrMiddleware } from './middlewares/user.middleware';

export class UserRouter extends BaseRouter<userController, UserrMiddleware> {
  constructor() {
    super(userController, UserrMiddleware);
  }

  routes(): void {
    this.router.get('/user', (req, res) => this.controller.GetUsers(req, res));
    this.router.get('/user/:id', (req, res) =>
      this.controller.GetUserById(req, res)
    );
    this.router.post(
      '/user',
      (req, res, next) => [this.middleware.userValidator(req, res, next)],
      (req, res) => this.controller.CreateUser(req, res)
    );
    this.router.put('/user/:id', (req, res) =>
      this.controller.UpdateUser(req, res)
    );
    this.router.delete('/user/:id', (req, res) =>
      this.controller.DeleteUser(req, res)
    );
  }
}
