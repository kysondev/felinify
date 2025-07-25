import { adminClient, inferAdditionalFields } from "better-auth/client/plugins";
import { twoFactorClient } from "better-auth/plugins";
import { createAuthClient } from "better-auth/react";
import { stripeClient } from "@better-auth/stripe/client";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  plugins: [
    twoFactorClient(),
    adminClient(),
    stripeClient({
      subscription: true,
    }),
    inferAdditionalFields({
      user: {
        credits: {
          type: "number",
        },
      },
    }),
  ],
});
