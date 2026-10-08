import { authenticate } from "../middleware/authMiddleware";
import { Router } from "express";
import {
  registeration,
  login,
  verifyOtp,
  profile,
  forgotPassword,
  resetPassword,
} from "../controller/authController";

const route = Router();

route.post("/registeration", registeration);
route.post("/login", login);
route.post("/verify-otp", verifyOtp);
route.post("/forgot-password", forgotPassword);
route.post("/reset-password", resetPassword);

route.post("/profile",authenticate, profile);

export default route;