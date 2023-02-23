import { BaseRouter } from '../shared/router/router';
import { OrderController } from './controllers/order.controller';
import { OrderMiddleware } from './middlewares/order.middleware';

export class OrderRouter extends BaseRouter<OrderController, OrderMiddleware> {
  constructor() {
    super(OrderController, OrderMiddleware);
  }

  routes(): void {
    this.router.get('/order', (req, res) =>
      this.controller.GetOrders(req, res)
    );
    this.router.get('/order/:id', (req, res) =>
      this.controller.GetOrderById(req, res)
    );
    this.router.post(
      '/order',
      (req, res, next) => [this.middleware.orderValidator(req, res, next)],
      (req, res) => this.controller.CreateOrder(req, res)
    );
    this.router.put('/order/:id', (req, res) =>
      this.controller.UpdateOrder(req, res)
    );
    this.router.delete('/order/:id', (req, res) =>
      this.controller.DeleteOrder(req, res)
    );
  }
}
