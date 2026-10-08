import {transporter} from "../config/mail";
import { welcomeEmail } from "../template/welcomeTemplate";
import { otpEmail } from "../template/otpTemplate";
import { resetCodeEmail } from "../template/resetCodeTemplate";

export const sendWelcomeEmail = async (
  email: string,
  name: string,
) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Welcome to e-commerce Application",
    html: welcomeEmail(name),
  });
};

export const sendOtpEmail = async (
  email: string,
  name: string,
  otp: string,
) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Verification Code",
    html: otpEmail(name, otp),
  });
};

export const sendResetCodeEmail = async (
  email: string,
  name: string,
  resetCode: string,
) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Password Reset Code",
    html: resetCodeEmail(name, resetCode),
  });
};
