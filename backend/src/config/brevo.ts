import { BrevoClient } from "@getbrevo/brevo";


export const brevoParadise = new BrevoClient({
    apiKey: process.env.BREVO_API_KEY as string,
})