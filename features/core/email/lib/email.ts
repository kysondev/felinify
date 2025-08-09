import { Resend } from "resend";
import { ReactNode } from "react";

export const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailProps {
  to: string;
  senderName?: string;
  senderEmail?: string;
  subject: string;
  html: ReactNode;
}

export const sendEmail = async ({
  to,
  senderName = process.env.DEFAULT_EMAIL_SENDER_NAME as string,
  senderEmail = process.env.DEFAULT_EMAIL_SENDER_EMAIL as string,
  subject,
  html,
}: SendEmailProps) => {
  try {
    const response = await resend.emails.send({
      from: `${senderName} <${senderEmail}>`,
      to: to,
      subject: subject,
      react: html,
    });
    return response;
  } catch (error) {
    return error;
  }
};
