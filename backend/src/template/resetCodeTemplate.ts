export const resetCodeEmail = (name: string, resetCode: string) => {
  return `
    <h1>Password Reset Request</h1>
    <p>Hi ${name},</p>
    <p>You have requested to reset your password. Please use the following code to reset your password:</p>
    <h2>${resetCode}</h2>
    <p>This code will expire in 10 minutes.</p>
  `;
};