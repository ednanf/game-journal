import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  res.status(err.statusCode || 500).json({
    status: 'error',
    data: {
      code: err.statusCode,
      message: err.message || 'Internal Server Error',
    }
  })
}

export default errorHandler;