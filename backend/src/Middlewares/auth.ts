import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../Models/User';

export const SECRET_KEY: any = process.env.SECRET_KEY;

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new Error();
    }

    if (!token) {
      return res.status(403).send('Token required');
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const id = decoded.user_id;
    const user = await User.findById(id);
    if (user) {
      //@ts-ignore
      req.user = user;
      next();
    }
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }
};
