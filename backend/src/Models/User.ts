import mongoose, { Schema } from 'mongoose';
import { IUser } from '../Types/IUser';

const UserSchema: Schema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
  },

  { timestamps: true },
);
const User = mongoose.model<IUser>('User', UserSchema);
export default User;
