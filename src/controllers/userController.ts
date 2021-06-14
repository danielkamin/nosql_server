import models from '../models/index';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { sendToken } from '../helpers/token';
export const register = async (req: Request) => {
  try {
    const existing = await models.User.findOne({ userName: req.body.userName });
    if (existing !== null) {
      return false;
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await models.User.create({
      userName: req.body.userName,
      password: hashedPassword,
    });
    await newUser.save();
    return true;
  } catch (err) {
    return err.toString();
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const user = await models.User.findOne({ userName: req.body.userName });
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return false;
    sendToken(res, user);
    return user._id;
  } catch (err) {
    return err.toString();
  }
};
