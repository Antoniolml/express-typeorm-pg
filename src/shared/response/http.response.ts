import { Response } from 'express';

export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export class HttpResponse {
  OK(res: Response, data?: any): Response {
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      statusMsg: 'Success',
      data,
    });
  }

  Created(res: Response, data?: any): Response {
    return res.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      statusMsg: 'Created',
      data,
    });
  }

  NoContent(res: Response): Response {
    return res.status(HttpStatus.NO_CONTENT).json({
      status: HttpStatus.NO_CONTENT,
      statusMsg: 'No Content',
    });
  }

  NotFound(res: Response, data?: any): Response {
    return res.status(HttpStatus.NOT_FOUND).json({
      status: HttpStatus.NOT_FOUND,
      statusMsg: 'Not Found',
      error: data,
    });
  }

  BadRequest(res: Response, data?: any): Response {
    return res.status(HttpStatus.BAD_REQUEST).json({
      status: HttpStatus.BAD_REQUEST,
      statusMsg: 'Bad Request',
      error: data,
    });
  }

  Unauthorized(res: Response, data?: any): Response {
    return res.status(HttpStatus.UNAUTHORIZED).json({
      status: HttpStatus.UNAUTHORIZED,
      statusMsg: 'Unauthorized',
      error: data,
    });
  }

  Forbidden(res: Response, data?: any): Response {
    return res.status(HttpStatus.FORBIDDEN).json({
      status: HttpStatus.FORBIDDEN,
      statusMsg: 'Forbidden',
      error: data,
    });
  }

  InternalServerError(res: Response, data?: any): Response {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      statusMsg: 'Internal Server Error',
      error: data,
    });
  }
}
