import { BaseRouter } from '../shared/router/router';
import { OrderItemController } from './controllers/order-item.controller';
import { OderItemMiddleware } from './middlewares/order-item.middleware';

export class OrderItemRouter extends BaseRouter<
  OrderItemController,
  OderItemMiddleware
> {
  constructor() {
    super(OrderItemController, OderItemMiddleware);
  }

  routes(): void {
    this.router.get('/orderitem', (req, res) =>
      this.controller.GetOrderItem(req, res)
    );
    this.router.get('/orderitem/:id', (req, res) =>
      this.controller.GetOrderItemById(req, res)
    );
    this.router.post(
      '/orderitem',
      (req, res, next) => [this.middleware.orderItemValidator(req, res, next)],
      (req, res) => this.controller.CreateOrderItem(req, res)
    );
    this.router.put('/orderitem/:id', (req, res) =>
      this.controller.UpdateOrderItem(req, res)
    );
    this.router.delete('/orderitem/:id', (req, res) =>
      this.controller.DeleteOrderItem(req, res)
    );
  }
}
