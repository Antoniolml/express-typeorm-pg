import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { CategoryDTO } from '../dtos/category.dto';

export class CategoryMiddleware {
  CategoryValidator(req: Request, res: Response, next: NextFunction) {
    const { name } = req.body;

    const valid = new CategoryDTO();
    valid.name = name;
    validate(valid).then((err) => {
      if (err.length > 0) {
        res.status(400).json({ message: 'Invalid data' });
      } else {
        next();
      }
    });
  }
}
