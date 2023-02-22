import { Router } from 'express';

export class BaseRouter<T, U> {
  public router: Router;
  public controller: T;
  public middleware: U;

  constructor(Tcontroller: { new (): T }, UMiddleware: { new (): U }) {
    this.router = Router();
    this.controller = new Tcontroller();
    this.middleware = new UMiddleware();

    this.routes();
  }

  routes() {}
}
