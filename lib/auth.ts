import argon2 from "argon2";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin, twoFactor } from "better-auth/plugins";
import { PrismaClient } from "../generated/prisma-client";
import TwoFactorVerificationEmail from "templates/emails/TwoFactorVerificationEmail";
import EmailVerification from "templates/emails/EmailVerification";
import ResetPassword from "templates/emails/ResetPassword";
import { sendEmail } from "./email";

const prisma = new PrismaClient();
export const auth = betterAuth({
  appName: process.env.APP_NAME,
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  advanced: {
    cookiePrefix: process.env.APP_NAME,
  },
  plugins: [
    twoFactor({
      otpOptions: {
        async sendOTP({ user, otp }) {
          await sendEmail({
            to: user.email,
            senderEmail: process.env.TWO_FA_EMAIL,
            subject: "Two-Factor Authentication (2FA)",
            html: TwoFactorVerificationEmail({ otp }),
          });
        },
      },

      skipVerificationOnEnable: true,
    }),
    admin(),
  ],
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        senderEmail: process.env.VERIFICATION_EMAIL,
        subject: "Email Verification",
        html: EmailVerification({ url }),
      });
    },
    sendOnSignUp: true,
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "github"],
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  emailAndPassword: {
    enabled: true,
    password: {
      hash: async (password: string) => {
        return await argon2.hash(password);
      },
      verify: async (info: any) => {
        return await argon2.verify(info.hash, info.password);
      },
    },
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        senderEmail: process.env.RESET_PASSWORD_EMAIL,
        subject: "Reset your password",
        html: ResetPassword({ url }),
      });
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
