import jwt from 'jsonwebtoken';
import { Response, Request } from 'express';

export const sendToken = (res: Response, user: any) => {
  const token = jwt.sign({ _id: user._id }, 'FFFFFF', {
    expiresIn: '7d',
  });
  res.cookie('_id', user._id);
  res.cookie('token', token, { httpOnly: true });
};

export const deleteToken = (res: Response) => {
  res.cookie('_id', '');
  res.cookie('token', '');
};

export const validateUser = (req: Request, res: Response, next: any) => {
  try {
    jwt.verify(req.cookies.token, 'FFFFFF');
    next();
  } catch (err) {
    return res.status(401).send('Unauthorized');
  }
};
