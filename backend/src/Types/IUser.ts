import { Document } from 'mongoose';

export interface IUser extends Document {
  userId?: string;
  fullName: string;
  age: string;
  userImg: string;
}
