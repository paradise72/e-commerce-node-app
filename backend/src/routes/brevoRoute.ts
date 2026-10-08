import {registeration, forgotPassword,login,verifyOtp,resetPassword,profile} from "../controller/authController";
import {authenticate} from "../middleware/authMiddleware";
import {Router} from "express";
const brevoRouter = Router();

brevoRouter.post("/registeration", registeration);
brevoRouter.post("/forgot-password", forgotPassword);
brevoRouter.post("/login", login);
brevoRouter.post("/verify-otp", verifyOtp);
brevoRouter.post("/reset-password", resetPassword);
brevoRouter.post("/profile",authenticate, profile);

export default brevoRouter;