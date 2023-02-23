import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { UserDTO } from '../dtos/user.dto';

export class UserrMiddleware {
  userValidator(req: Request, res: Response, next: NextFunction) {
    const { name, lastName, userName, email, password, city, province, role } =
      req.body;

    const valid = new UserDTO();
    valid.name = name;
    valid.lastName = lastName;
    valid.userName = userName;
    valid.email = email;
    valid.password = password;
    valid.city = city;
    valid.province = province;
    valid.role = role;

    validate(valid).then((err) => {
      if (err.length > 0) {
        console.log(err);
        res.status(400).json({ message: 'Invalid data' });
      } else {
        next();
      }
    });
  }
}
