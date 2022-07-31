import mongoose, { Schema } from 'mongoose';

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
    bio: {
      type: String,
    },
  },

  { timestamps: true },
);
const User = mongoose.model('User', UserSchema);
export default User;
