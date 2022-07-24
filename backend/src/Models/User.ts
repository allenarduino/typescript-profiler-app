import mongoose, { Schema } from 'mongoose';
import { IUser } from '../Types/IUser';

const UserSchema: Schema = new Schema(
  {
    fullName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    userImg: {
      type: String,
    },
    age: {
      type: Number,
    },
  },

  { timestamps: true },
);
const User = mongoose.model<IUser>('User', UserSchema);
export default User;
