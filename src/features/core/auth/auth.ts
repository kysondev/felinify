import argon2 from "argon2";
import { betterAuth } from "better-auth";
import { admin, openAPI, twoFactor } from "better-auth/plugins";
import { redis } from "src/lib/redis";
import { db } from "src/lib/db";
import { stripe } from "@better-auth/stripe";
import { plans } from "@subscription/config/plans.config";
import Stripe from "stripe";
import { refillEnergyForUser } from "@subscription/services/energy-refill.service";
import {
  sendResetPasswordEmail,
  sendTwoFAEmail,
  sendVerificationEmail,
} from "@email/services/email.service";

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const auth = betterAuth({
  appName: "Felinify",
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  database: {
    db: db,
  },
  user: {
    additionalFields: {
      energy: {
        type: "number",
      },
      usernameSet: {
        type: "boolean",
      },
    },
  },
  secondaryStorage: {
    async get(key: string): Promise<string | null> {
      try {
        const value = await redis.get(key);

        if (value !== null && typeof value === "object") {
          return JSON.stringify(value);
        }
        return String(value);
      } catch (error) {
        console.error(`Error retrieving key ${key} from Redis:`, error);
        return null;
      }
    },
    async set(key: string, value: string, ttl?: number): Promise<void> {
      try {
        if (ttl) {
          await redis.setex(key, ttl, value);
        } else {
          await redis.set(key, value);
        }
      } catch (error) {
        console.error(`Error setting key ${key} in Redis:`, error);
      }
    },
    async delete(key: string): Promise<void> {
      try {
        await redis.del(key);
      } catch (error) {
        console.error(`Error deleting key ${key} from Redis:`, error);
      }
    },
  },
  advanced: {
    cookiePrefix: "Felinify",
  },
  plugins: [
    twoFactor({
      otpOptions: {
        async sendOTP({ user, otp }) {
          await sendTwoFAEmail(user, otp);
        },
      },
      skipVerificationOnEnable: false,
    }),
    admin(),
    stripe({
      stripeClient,
      stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
      createCustomerOnSignUp: true,
      subscription: {
        enabled: true,
        plans: plans,
        getCheckoutSessionParams: async () => {
          return {
            params: {
              allow_promotion_codes: true,
              payment_method_types: ["card", "cashapp"],
            },
          };
        },
        onSubscriptionComplete: async ({ subscription }) => {
          try {
            if (subscription && subscription.referenceId) {
              await refillEnergyForUser(subscription.referenceId);
              fetch(
                `${process.env.NEXT_PUBLIC_APP_URL}/api/revalidate?path=/library`
              );
              fetch(
                `${process.env.NEXT_PUBLIC_APP_URL}/api/revalidate?path=/settings`
              );
            }
          } catch (error) {
            console.error(
              "Error refilling energy on subscription complete:",
              error
            );
          }
        },
        onSubscriptionUpdate: async ({ subscription }) => {
          try {
            if (subscription && subscription.referenceId) {
              await refillEnergyForUser(subscription.referenceId);
              fetch(
                `${process.env.NEXT_PUBLIC_APP_URL}/api/revalidate?path=/library`
              );
              fetch(
                `${process.env.NEXT_PUBLIC_APP_URL}/api/revalidate?path=/settings`
              );
            }
          } catch (error) {
            console.error(
              "Error refilling energy on subscription update:",
              error
            );
          }
        },
        onSubscriptionCancel: async () => {
          fetch(
            `${process.env.NEXT_PUBLIC_APP_URL}/api/revalidate?path=/library`
          );
          fetch(
            `${process.env.NEXT_PUBLIC_APP_URL}/api/revalidate?path=/settings`
          );
        },
      },
    }),
    openAPI(),
  ],
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await sendVerificationEmail(user, url);
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
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
      await sendResetPasswordEmail(user, url);
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
