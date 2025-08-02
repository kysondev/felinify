"use server";
import { User } from "better-auth";
import { db } from "lib/db";
import { sendEmail } from "lib/email";
import EmailVerification from "templates/emails/EmailVerification";
import ResetPassword from "templates/emails/ResetPassword";
import TwoFactorVerificationEmail from "templates/emails/TwoFactorVerificationEmail";

export const sendVerificationEmail = async (user: User, url: string) => {
  await sendEmail({
    to: user.email,
    senderEmail: process.env.VERIFICATION_EMAIL,
    subject: "Email Verification",
    html: EmailVerification({ url }),
  });
};

export const sendTwoFAEmail = async (user: User, otp: string) => {
  await sendEmail({
    to: user.email,
    senderEmail: process.env.TWO_FA_EMAIL,
    subject: "Two-Factor Authentication (2FA)",
    html: TwoFactorVerificationEmail({ otp }),
  });
};

export const sendResetPasswordEmail = async (user: User, url: string) => {
  await sendEmail({
    to: user.email,
    senderEmail: process.env.RESET_PASSWORD_EMAIL,
    subject: "Reset your password",
    html: ResetPassword({ url }),
  });
};

export const subscribeEmail = async (email: string) => {
  const existingEmail = await db
  .selectFrom("subscriptionEmail")
  .where("email", "=", email)
  .selectAll()
  .executeTakeFirst();
  if (existingEmail) {
    return { success: false, message: "Email already subscribed" };
  }
  await db.insertInto("subscriptionEmail").values({ id: crypto.randomUUID(), email, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }).execute();
  return { success: true, message: "Email subscribed successfully" };
}