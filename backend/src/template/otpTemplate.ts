export const otpEmail = (name: string, otp: string) => {
  return `
    <h1>Email Verification</h1>

    <p>Hello ${name},</p>

    <p>
      Your verification code is:
    </p>

    <h2>${otp}</h2>

    <p>
      This code will expire in 10 minutes.
    </p>

    <p>
      If you did not request this code, please ignore this email.
    </p>
  `;
};