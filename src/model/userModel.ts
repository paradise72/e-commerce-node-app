import mongoose from "mongoose";

export interface IUser extends Document{
  name: string;
  email: string;
  password: string;
}   

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
},
  {
    timestamps: true,
  },
);

export const User = mongoose.model("User", userSchema);
