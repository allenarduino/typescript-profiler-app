import { Request, Response } from 'express';
import User from '../Models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password, age } = req.body;
    const bio: string = 'My bio here';
    if (!fullName || !age || !password || !bio) {
      res.status(400).json({
        message: 'Data cannot be empty!',
      });
      return;
    }
    const userImg: string =
      'https://res.cloudinary.com/dv5qiaugw/image/upload/v1658610837/profiler/avatar_pnrepu.jpg';
    const harshed_password: string = bcrypt.hashSync(password, 12);
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(409).json({
        error: 'Email already exists',
      });
    } else {
      const newUser = new User({
        fullName: fullName,
        email: email,
        age: age,
        password: harshed_password,
        userImg: userImg,
        bio: bio,
      });
      newUser.save();
      return res.status(200).json({ message: 'You are registered sucessfully' });
    }
  } catch (e) {
    console.log(e);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send({
        message: 'Data cannot be empty!',
      });
    }
    const user = await User.findOne({ email });
    //check user
    if (!user) {
      return res.status(404).json({
        error: 'User not found',
      });
    }

    //check password
    const password_verified: boolean = bcrypt.compareSync(password, user.password);
    if (password_verified) {
      const payload = {
        user_id: user._id,
      };
      const SECRET_KEY: any = process.env.SECRET_KEY;
      const token: string = jwt.sign(payload, SECRET_KEY);
      res.status(200).json(token);
    } else {
      res.status(401).json({
        error: 'Invalid email or password',
      });
    }
  } catch (e) {
    console.log(e);
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().sort({ date: -1 });
    res.status(200).json(users);
  } catch (e) {
    console.log(e);
  }
};

export const getSingleUser = async (req: Request, res: Response) => {
  try {
    const user = await User.find({ _id: req.params.id });
    res.status(200).json(user);
  } catch (e) {
    console.log(e);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { fullName, age, bio } = req.body;
    if (!fullName || !age || !bio) {
      res.status(400).json({
        message: 'Data cannot be empty!',
      });
      return;
    }
    const user = await User.findByIdAndUpdate(req.params.id, {
      fullName: fullName,
      age: age,
      bio: bio,
    });

    if (!user) {
      res.status(404).json({ error: 'User with id not found' });
      return;
    }
    res.status(200).json({
      message: 'User updated successfully',
    });
  } catch (e) {
    console.log(e);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.deleteOne({ _id: req.params.id });
    if (!user) {
      res.status(404).json({ Error: 'User with id not found' });
    }
    res.status(200).json({
      message: 'User deleted',
    });
  } catch (e) {
    console.log(e);
  }
};
