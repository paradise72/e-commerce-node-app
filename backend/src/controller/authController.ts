import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createHash } from "crypto";

import User from "../model/userModel";
import {
  sendWelcomeEmail,
  sendResetCodeEmail,
  sendOtpEmail,
} from "../services/emailService";

import{sendWelcomeEmailBrevo,sendResetCode, sendOtpEmailBrevo} from "../services/brevoEmailService";
import { generateOTP } from "../utils/otp";

const hashCode = (code: string): string => {
  return createHash("sha256").update(code).digest("hex");
};

export const registeration = async (
  req: Request,
  res: Response,
) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    await sendWelcomeEmail(user.email, user.name);

    return res.status(201).json({
      message: "Registration successful. Welcome email sent.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Registration failed", error
    });
  }
};

//Function to handle user login

export const login = async (
  req: Request,
  res: Response,
) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password,
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const otp = generateOTP();

    const otpExpiresAt = new Date(
      Date.now() + 10 * 60 * 1000,
    );

    user.otp = otp;
    user.otpExpiresAt = otpExpiresAt;

    await user.save();

    await sendOtpEmail(
      user.email,
      user.name,
      otp,
    );

    return res.status(200).json({
      message: "Credentials verified. OTP sent to your email.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Login failed",
    });
  }
};




export const verifyOtp = async (
  req: Request,
  res: Response,
) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (!user.otp || !user.otpExpiresAt) {
      return res.status(400).json({
        message: "No OTP found",
      });
    }

    // Check whether the OTP is correct
    if (user.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    // Check whether the OTP has expired
    if (new Date() > user.otpExpiresAt) {
      return res.status(400).json({
        message: "OTP has expired",
      });
    }

    // OTP is valid
    user.isVerified = true;

    // Remove OTP after successful verification
    user.otp = undefined;
    user.otpExpiresAt = undefined;

    await user.save();

    const token = jwt.sign(
  {
    userId: user._id,
    email: user.email,
  },
  process.env.JWT_SECRET as string,
  {
    expiresIn: "1h",
  },
);

  return res.status(200).json({
  message: "Login successful",
  token,
});


  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "OTP verification failed",
    });
  }
};



// VIEW PROFILE: authentication required
export const profile = async (
  req: Request,
  res: Response,
) => {
  try {
    // Your authenticate middleware must attach the decoded JWT here.
    const authenticatedRequest = req as Request & {
      user?: { userId?: string; email?: string };
    };

    const userId = authenticatedRequest.user?.userId;

    if (!userId) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const user = await User.findById(userId).select(
      "-password -otp -otpExpiresAt -resetCode -resetCodeExpires",
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "Profile retrieved successfully",
      user,
    });
  } catch (error) {
    console.error("Profile error:", error);

    return res.status(500).json({
      message: "Could not retrieve profile",
    });
  }
};



// FORGOT PASSWORD: public route
export const forgotPassword = async (
  req: Request,
  res: Response,
) => {
  try {
    const { email } = req.body;

    if (!email || typeof email !== "string") {
      return res.status(400).json({
        message: "A valid email is required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Use the same response for existing and unknown accounts.
    const message =
      "If that email is registered, a reset code has been sent.";

    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(200).json({ message });
    }

    const code = generateOTP();

    user.resetCode = hashCode(code);
    user.resetCodeExpires = new Date(Date.now() + 10 * 60 * 1000);

    await user.save();

    try {
      await sendResetCodeEmail(user.email, user.name, code);
    } catch (emailError) {
      console.error("Password reset email failed:", emailError);

      user.resetCode = undefined;
      user.resetCodeExpires = undefined;
      await user.save();

      return res.status(500).json({
        message: "Could not send reset email. Please try again later.", emailError
      });
    }

    return res.status(200).json({ message });
  } catch (error) {
    console.error("Forgot password error:", error);

    return res.status(500).json({
      message: "Could not process password reset request",
    });
  }
};

// RESET PASSWORD: public route, but requires a valid reset code
export const resetPassword = async (
  req: Request,
  res: Response,
) => {
  try {
    const { email, code, newPassword } = req.body;

    if (
      !email ||
      !code ||
      !newPassword
    ) {
      return res.status(400).json({
        message: "Email, code and newPassword are required",
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        message: "New password must contain at least 8 characters",
      });
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    const user = await User.findOne({
      email: normalizedEmail,
      resetCode: hashCode(String(code).trim()),
      resetCodeExpires: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired reset code",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);

    // A reset code must only work once.
    user.resetCode = undefined;
    user.resetCodeExpires = undefined;

    // Also invalidate any pending login OTP.
    user.otp = undefined;
    user.otpExpiresAt = undefined;

    await user.save();

    return res.status(200).json({
      message: "Password reset successful. You can now log in.",
    });
  } catch (error) {
    console.error("Reset password error:", error);

    return res.status(500).json({
      message: "Could not reset password",
    });
  }
};