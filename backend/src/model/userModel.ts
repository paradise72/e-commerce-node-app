import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;

  isVerified: boolean;

  otp?: string;
  otpExpiresAt?: Date;
  resetCode?: string;
  resetCodeExpires?: Date;

}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    otp: {
      type: String,
    },

    otpExpiresAt: {
      type: Date,
    },

    resetCode: {
      type: String,
      default: undefined,
    },

    resetCodeExpires: {
      type: Date,
      default: undefined,
    }
  },
  {
    timestamps: true,
  },
);
export const User = mongoose.model("User", userSchema);
  
export default User;

