import { Router } from "express";
import { emailSend } from "../controller/emailController";

const router = Router();

router.post("/send-email", emailSend);

export default router;