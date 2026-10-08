import { brevoParadise} from "../config/brevo";


export const brevoEmail = async (to: string, subject: string, html: string) => {
  try {
    const response  =  await brevoParadise.transactionalEmails.sendTransacEmail({
      sender: {
        email: process.env.BREVO_SENDER_EMAIL as string,
        name: process.env.BREVO_SENDER_NAME as string,
      },
      to: [
        {
          email: to,
        },
      ],
      subject: subject,
      htmlContent: html,
    });
    return response;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};
