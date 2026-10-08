import {otpEmail} from "../template/otpTemplate";
import {resetCodeEmail} from "../template/resetCodeTemplate";
import {welcomeEmail} from "../template/welcomeTemplate";
import {brevoEmail} from "../controller/brevoEmailController";

export const sendResetCode = async (
    email: string,
    name: string, 
    otp: string,)  => {
        await brevoEmail(
            email,
            "Your Password Reset Code",

            resetCodeEmail(name, otp)
             
        );
}

export const sendOtpEmailBrevo = async (
    email: string,
    name: string, 
    otp: string,)  => {
        await brevoEmail(
            email,
            "Your Verification Code",
            otpEmail(name, otp)
        );
    }


export const sendWelcomeEmailBrevo = async (
    email: string, 
    name: string,)  => {

        await brevoEmail(
            email,
            "Welcome to e-commerce Application",

            welcomeEmail(name)
        );
}


