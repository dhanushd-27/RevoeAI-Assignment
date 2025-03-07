import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const userAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({
      message: 'Unauthorized Access',
    });
    return;
  }

  try {
    const decoded: JwtPayload = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    req.user = {
      id: decoded._id,
      email:decoded.email
    };

    next();
  } catch (error) {
    res.status(401).json({
      message: 'Unauthorized Access',
    });
  }
}