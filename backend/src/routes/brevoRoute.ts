import {registeration, forgotPassword,login} from "../controller/authController";

import {Router} from "express";
const brevoRouter = Router();

brevoRouter.post("/registeration", registeration);
brevoRouter.post("/forgot-password", forgotPassword);
brevoRouter.post("/login", login);

export default brevoRouter;