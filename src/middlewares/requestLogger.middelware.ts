import { Request, Response, NextFunction } from 'express';

const requestLoggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.info(`${req.method}|${req.originalUrl}`);
    const start = new Date().getTime();
    res.on('finish', () => {
        const end = new Date().getTime() - start;
        console.info(`${req.method}|${req.originalUrl}|${res.statusCode}|${end}ms`);
    });
    next();
};

export { requestLoggerMiddleware };