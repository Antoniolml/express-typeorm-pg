import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { OrderDTO } from '../dtos/order.dto';

export class OrderMiddleware {
  orderValidator(req: Request, res: Response, next: NextFunction) {
    const { customerId, status, paymentMethod } = req.body;

    const valid = new OrderDTO();
    valid.customerId = customerId;
    valid.status = status;
    valid.paymentMethod = paymentMethod;

    validate(valid).then((err) => {
      if (err.length > 0) {
        res.status(400).json({ message: 'Invalid data' });
      } else {
        next();
      }
    });
  }
}
