import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { OrderItemDTO } from '../dtos/order-item.dto';

export class OderItemMiddleware {
  orderItemValidator(req: Request, res: Response, next: NextFunction) {
    const { quantity, totalPrice, productId, orderId } = req.body;

    const valid = new OrderItemDTO();
    valid.quantity = quantity;
    valid.totalPrice = totalPrice;
    valid.productId = productId;
    valid.orderId = orderId;

    validate(valid).then((err) => {
      if (err.length > 0) {
        res.status(400).json({ message: 'Invalid data' });
      } else {
        next();
      }
    });
  }
}
