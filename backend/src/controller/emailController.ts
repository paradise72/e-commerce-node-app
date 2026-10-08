
import { Request, Response } from "express";
import { sendWelcomeEmail } from "../services/emailService";
import { welcomeEmail } from "../template/welcomeTemplate";

export const emailSend = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, name } = req.body;

    if (!email || !name) {
      return res.status(400).json({
        message: "Email and name are required",
      });
    }

    const html = welcomeEmail(name);

    await sendWelcomeEmail(
      
      "${email}: Welcome to our application",
      html
    );

    return res.status(200).json({
      message: "Email sent successfully",
    });

  } catch (error) {
    console.error("Email sending failed:", error);

    return res.status(500).json({
      message: "Failed to send email",
    });
  }
};

